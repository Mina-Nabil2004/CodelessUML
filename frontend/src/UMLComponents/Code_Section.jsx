const Code_Section = (codeLines) => {

    const totalLines = 27; // Total number of lines to display
    const emptyLines = totalLines - codeLines.length; // Calculate empty lines

  function handleBackButtonClick() {
    window.location.href = `${window.location.origin}`
  }

    return (
        <div style={{ position: 'relative' }}>
            <button style={{
                position: 'absolute',
                top: '29px',
                right: '60px',
                padding: '5px 10px',
                backgroundColor: '#433F70',
                color: '#FFF',
                border: '1.5px solid #2F2746',
                borderRadius: '0 5px  5px  0',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                outline: 'none',
                boxShadow: 'none'
            }}>
                <img 
                    src="https://s3-alpha-sig.figma.com/img/0755/2b38/5ee9b7d05f24c7496d28173c063e6fd3?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=C8-8xkYBfPLkZ2UknkuhsVVHmKhxdwIebAOX8iH676ur37XvetQyg-H3KgATcFkeC-gARGDk~j6-92A2Ik6Uw~-ojQN1BHXfWYBCWcvBDqaA5vRG~mdDEuAfC5~b9h85J~bfAGu7GftV86RHN~51PGm278oLkZoeBKHXO~6Y0fpkQWhF16Q9gtzAyCtBmveDbVKUiaK9WAO~SeLsyjnXnKofi5A6rp3mbxOLmbz~tw-vWZOjNO22rWTFHMRZuFuC-QNBYRKcxY67oCPyCzM-RKjMBGmvJppVoEjwG3W~MIhH1BSgJSUUdtT5kLclq3HiX-kllq77-zIl0NlKMtrkkw__" 
                    alt="Download Button" 
                    style={{
                        width: '20px',  // Adjust size as needed
                        height: '20px', // Adjust size as needed
                        marginRight: '5px' // Space between image and button edge
                    }} 
                />
            </button>
            <button style={{
                position: 'absolute',
                top: '30px',
                right: '100px',
                padding: '5px 10px',
                backgroundColor: '#433F70',
                color: '#FFF',
                border: 'none',
                borderRadius: '5px 0 0 5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                outline: 'none',
                boxShadow: 'none'
            }}>
               <img
                  src="https://s3-alpha-sig.figma.com/img/ce2a/595a/23238bad0c5abe4453882fd2f9c60f9d?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BO0hQxG2iGC0zJbsHXA4lIpfhCDhgzhKRVKaiuRWcJ-jmhn~sfke-~31i4PkqhsclKPTHwRNTVzM6S9Gse-G9O8JSdMUDsjPJoTwuB1vXRyyd4vnRp6FuGBjo6JlzfjJf6qLFAfyTVLa5Z~y3t8lPnjFrhXbAoinLqdwPRWFPoXLLhSucSKqNoDPcQLQgPAhuKkckA5jiWm632isbktlYgw17DDr-jBbpjhVLGmXfL9BOuVRp9qx7IE1PT08QZ2o-RdkTfl12eDl3u73qBNsEwOvxR9CLUK-2fsS977Kum21pS9ODDxyinhgu57Ig9K84cu-p~N4X2rgTNq5l5AOgA__"
                  alt="Back Button"
                  onClick={handleBackButtonClick}
                  style={{
                      width: '30px',  // Adjust size as needed
                      height: '20px', // Adjust size as needed
                      marginRight: '5px' // Space between image and button edge
                  }}
              />
            </button>
            <div style={{
                display: 'flex',
                marginTop: '22px',
                marginRight: '22px',
                backgroundColor: '#2F2746',
                width: '996px',
                maxHeight: '550px',
                border: '1.5px solid #2F7784',
                borderRadius: '15px',
                overflowY: 'auto',
                padding: '10px',
                fontFamily: 'monospace',
                color: '#FFF'
            }}>
                <pre style={{ margin: 0 }}>
                    {Array.from({ length: totalLines }).map((_, index) => (
                        <div key={index}>
                            <span style={{ color: '#2F7784', marginRight: '10px' }}>{index + 1}</span>
                            {index < codeLines.length ? codeLines[index] : ' '}
                        </div>
                    ))}
                </pre>
            </div>
        </div>
    );
};

export default Code_Section;
    