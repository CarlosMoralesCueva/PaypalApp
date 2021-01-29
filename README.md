Para la ejecución de este proyecto se debe contar con Node.js y ngrok
<br />
<br />

En una línea de comandos como cmd, Power Shell, Git cmd o un similar ejecutar:
<br />
<br />

*git init*
<br />

*git* *clone* https://github.com/CarlosMoralesCueva/PaypalApp 
<br />

*cd paypalApp* 
<br />

*code .*	 
<br />

*npm install* 
<br />

*nodemon app.js* 
<br />
<br />

Se debe crear un túnel con ngrok para que la integración con PayPal pueda conectarse con el ambiente de desarrollo:
<br />

Ingresando en una línea de comandos en el directorio donde se encuentra el ejecutable de ngrok:
<br />

**ngrok.exe http 4000 -host-header="localhost:4000"**
<br />

Se debe editar dentro de la aplicación en el archivo **PaypalApp/app.js** editar **redirect_urls** con la url obtenida en ngrok, la cual se la encontrará en el siguiente formato:
<br />

https://149f225e949f.ngrok.io
<br />
