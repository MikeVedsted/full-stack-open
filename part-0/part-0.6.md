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

note over Browser:
User enters message
end note

note over Browser:
User clicks Save
end note

note over Browser:
Default behaviour is prevented, 
so Brower doesn't refresh
end note

note over Browser:
Event handler adds the new note
to the list, rerenders the list, 
and sends the new note to the server.
end note

Browser->Server: POST Request to https://studies.cs.helsinki.fi/exampleapp/new_note

note over Server:
Server adds the post to an array of post-objects
end note

Server-->Browser: status 201 (Created)
