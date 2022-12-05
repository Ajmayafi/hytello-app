import React from "react";
import { WebView } from "react-native-webview"
import { useAuthStates } from "../../../hooks/useAuthStates";


export const CardDetailsComponent = ({ cardToken, cardid }) => {

  const { user } = useAuthStates()

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
        </style>
    </head>
    <body>    
     <label>Name:</label>
     <p>Abubakar Jamilu</p>

    <label>Card Number:</label>
    <p id=""></p>
    <div id="cardNumber"></div>
      
    <label>CVV2:</label>
    <div id="cvv2"></div>

    <label>Address:</label>
    <p>${user.address}</p>

    <label>State:</label>
    <p>${user.state}</p>

    <label>City:</label>
    <p>${user.city}</p>
    
    <script type="text/javascript" src="https://js.verygoodvault.com/vgs-show/1.5/ACiWvWF9tYAez4BitGpSE68f.js"></script>
    <script type="text/javascript">
    const show = VGSShow.create('tntbuyt0v9u');
    const cardToken = "${cardToken}";
    const cardId = "${cardid}";
   
    const cvv2iframe = show.request({
            name: 'data-text',
            method: 'GET',
            path: '/cards/' + cardId + '/secure-data/cvv2',
            headers: {
                "Authorization": "Bearer " + cardToken
            },
            htmlWrapper: 'text',
            jsonPathSelector: 'data.cvv2'
        });
    cvv2iframe.render('#cvv2', {
        '@font-face': { 
            'font-family': 'PT Mono',
            'font-style': 'normal',
            'font-weight': '400',
            'font-display': 'swap',
            'src': 'local("PT Mono"), local("PTMono-Regular")          url(https://fonts.gstatic.com/s/ptmono/v7/9oRONYoBnWILk-9AnCszM_HxEcn7Hg.woff2) format("woff2")',
            'unicode-range': 'U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116'
          },
          'font-family': '"PT Mono", monospace',
            'color': 'black',
            'font-size': '60px',
    });
   
   
    const cardNumberIframe = show.request({
            name: 'data-text',
            method: 'GET',
            path: '/cards/' + cardId + '/secure-data/number',
            headers: {
                "Authorization": "Bearer " + cardToken
            },
            htmlWrapper: 'text',
            jsonPathSelector: 'data.number'
        });
    cardNumberIframe.render('#cardNumber', {
        '@font-face': { 
            'font-family': 'PT Mono',
            'font-style': 'normal',
            'font-weight': '400',
            'font-display': 'swap',
            'src': 'local("PT Mono"), local("PTMono-Regular")          url(https://fonts.gstatic.com/s/ptmono/v7/9oRONYoBnWILk-9AnCszM_HxEcn7Hg.woff2) format("woff2")',
            'unicode-range': 'U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116'
          },
          'font-family': '"PT Mono", monospace',
            'color': 'black',
            'font-size': '60px',
    });
   
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