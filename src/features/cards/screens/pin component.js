import React, { useEffect } from "react";
import { WebView } from "react-native-webview"


export const PinViewComponent = ({ cardToken, cardid }) => {

    const names = "2222";

    const html = `
    <html>
    <head>
        <meta charSet="utf-8">
        <title></title>
        <style>
            iframe {
                width: 100%;
            }
            label {
                font-size: 60px;
            }
            #pin{
            }

            p{
                font-size: 50px;
                font-weight: 300;
            }
            #pin{
                width: 320px;
                border-radius: 10px;
                margin: auto;
                text-align: center;
                padding-left: 60px;
            }

            
        </style>
    </head>
    <body>  
     <p class="info">The four numbers below are your virtual card PIN, please keep it safe.<p/>
     <p class="info">Use your card PIN for online transactions.<p/>

    <div class="container">
    <div id="pin"></div>
    </div>
    
    <script type="text/javascript" src="https://js.verygoodvault.com/vgs-show/1.5/ACiWvWF9tYAez4BitGpSE68f.js"></script>
    <script type="text/javascript">
    const show = VGSShow.create('tntbuyt0v9u');
    const cardToken = "${cardToken}";
    const cardId = "${cardid}";
   
   
   
   const pinIframe = show.request({
            name: 'data-text',
            method: 'GET',
            path: '/cards/' + cardId + '/secure-data/defaultPin',
            headers: {
                "Authorization": "Bearer " + cardToken
            },
            htmlWrapper: 'text',
            jsonPathSelector: 'data.defaultPin'
        });
    pinIframe.render('#pin', {
        '@font-face': { 
            'font-family': 'PT Mono',
            'font-style': 'normal',
            'text-align': 'center',
            'font-weight': '400',
            'font-display': 'swap',
            'src': 'local("PT Mono"), local("PTMono-Regular")          url(https://fonts.gstatic.com/s/ptmono/v7/9oRONYoBnWILk-9AnCszM_HxEcn7Hg.woff2) format("woff2")',
            'unicode-range': 'U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116'
          },
          'font-family': '"PT Mono", monospace',
            'color': 'black',
            'font-size': '65px',
    });
    </script>
    </body>
    </html>
    `;

    return (
        <WebView style={{ flex: 1, backgroundColor: 'gainsboro'}} source={{ html: html }}
        javaScriptEnabled={true} scalesPageToFit={true}
        mixedContentMode="always"
        originWhitelist={["*"]}
        thirdPartyCookiesEnabled={true}
         />
    )
}