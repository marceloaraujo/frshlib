# frshlib
A simple JavaScript library to use the FreshDesk API's methods.

If you want to use this library in Freshdesk App Development Platform V1, follow these steps:
* Add this library in the ***assets*** folder;
* Import ***frshlib.js*** in ***template.html*** file:
```html
<script src="{{'frshlib.js' | asset_url}}"></script>
```
* Then, use ***frshlib*** variable:
```javascript
frshlib.createTicket(ticketData);
```
If you want to use this libary in Freshdesk App Development Platform V2, follow these steps:
* Create a folder called ***library*** into ***app*** folder and move this lib inside it
* Import ***frshlib.js*** in ***template.html*** file:
```html
<script src="library/frshlib.js"></script>
```
* Then, use ***frshlib*** variable:
```javascript
frshlib.createTicket(ticketData);
```

To use this lib outside Freshdesk project, you need to download ***jQuery***.


(Documentation soon!!)
