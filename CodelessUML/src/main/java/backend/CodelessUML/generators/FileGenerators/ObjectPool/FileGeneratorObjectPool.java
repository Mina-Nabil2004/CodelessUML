package backend.CodelessUML.generators.FileGenerators.ObjectPool;

import backend.CodelessUML.generators.FileGenerators.Factory.FileGeneratorFactory;
import backend.CodelessUML.generators.FileGenerators.FileGenerator;
import backend.CodelessUML.generators.FileGenerators.FileGeneratorType;
import backend.CodelessUML.generators.languages.Langauge;

import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.locks.ReadWriteLock;

import java.util.concurrent.*;
import java.util.concurrent.locks.ReentrantReadWriteLock;


public class FileGeneratorObjectPool {
    private final FileGeneratorFactory fileGeneratorFactory;
    private final ConcurrentHashMap<String, Queue<FileGenerator>> poolMap = new ConcurrentHashMap<>();
    private final ScheduledExecutorService cleaner = Executors.newScheduledThreadPool(1);

    private static final int INITIAL_POOL_SIZE = 50;
    private static final int MAX_POOL_SIZE = 200;
    private static final int CLEANUP_INTERVAL = 30;
    private final AtomicInteger currentPoolSize = new AtomicInteger(INITIAL_POOL_SIZE);

    private final ReadWriteLock lock = new ReentrantReadWriteLock();

    public FileGeneratorObjectPool(FileGeneratorFactory fileGeneratorFactory) {
        this.fileGeneratorFactory = fileGeneratorFactory;
        cleaner.scheduleAtFixedRate(this::cleanUp, CLEANUP_INTERVAL, CLEANUP_INTERVAL, TimeUnit.SECONDS);
    }

    public void release(FileGenerator generator, FileGeneratorType type) {
        poolMap.computeIfAbsent(type.toString(), k -> new ConcurrentLinkedQueue<>());
        Queue<FileGenerator> queue = poolMap.get(type.toString());
        if (queue.size() < currentPoolSize.get()) {
            queue.offer(generator);
        }
    }

    public FileGenerator get(FileGeneratorType type, Langauge language) {
        poolMap.computeIfAbsent(type.toString(), k -> new ConcurrentLinkedQueue<>());
        Queue<FileGenerator> queue = poolMap.get(type.toString());

        lock.readLock().lock();
        try {
            while (!queue.isEmpty()) {
                FileGenerator generator = queue.poll();
                if (generator != null) {
                    generator.setLanguage(language);
                    return generator;
                }
            }
        } finally {
            lock.readLock().unlock();
        }

        lock.writeLock().lock();
        try {
            return fileGeneratorFactory.createFile(type, language);
        } finally {
            lock.writeLock().unlock();
        }
    }

    private void cleanUp() {
        poolMap.forEach((type, queue) -> {
            // Clean up stale references manually (e.g., check if objects are expired or inactive)
            // In this case, we assume no WeakReference, just removing objects if needed
            // Add logic to remove expired or inactive objects from the pool

            // Adjust pool size dynamically as needed
            int queueSize = queue.size();
            int currentPool = currentPoolSize.get();

            if (queueSize > currentPool / 2 && currentPool < MAX_POOL_SIZE) {
                currentPoolSize.addAndGet(10);
            } else if (queueSize < currentPool / 4 && currentPool > INITIAL_POOL_SIZE) {
                currentPoolSize.addAndGet(-5);
            }

            // Slowly remove excess objects
            while (queue.size() > currentPoolSize.get() && queue.size() > INITIAL_POOL_SIZE) {
                queue.poll();
            }
        });
    }
}
