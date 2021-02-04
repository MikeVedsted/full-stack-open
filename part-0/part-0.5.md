Below text can be displayed as a sequence diagram by copy-pasting it into https://www.websequencediagrams.com/

note over Browser:
User clicks link or enters url
end note

Browser->Server: GET Request to https://studies.cs.helsinki.fi/exampleapp/spa
Server-->Browser: HTML document, status 200 (ok)
Browser->Server: GET Request to https://studies.cs.helsinki.fi/exampleapp/main.css
Server-->Browser: main.css, status 200 (ok)
Browser->Server: GET Request to https://studies.cs.helsinki.fi/exampleapp/spa.js
Server-->Browser: spa.js, status 200 (ok)

note over Browser:
Browser executes javascript, which will 
request the data wit a GET request. 
end note

Browser->Server: GET Request to Request URL: https://studies.cs.helsinki.fi/exampleapp/data.json
Server-->Browser: data.json, status 200 (ok)

note over Browser:
Browser starts executing the event handler 
that populates the data into the ul in li's
end note

Browser->Server: GET Request URL: https://studies.cs.helsinki.fi/favicon.ico
Server-->Browser: favicon.ico, status 200 (ok)