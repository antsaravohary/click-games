   @component('mail::message',['to'=>$to[0]['address']])
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
        <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #e8eced;">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                <div class="u-col u-col-100"
                    style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                    <div style="background-color: #fcfcfc;width: 100% !important;">
                        <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                            <table style="font-family:'Montserrat',sans-serif;" role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tbody>
                                    <tr>
                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;"
                                            align="left">
                                            <div
                                                style="color: #34495e; line-height: 140%; text-align: center; word-wrap: break-word;">
                                                <p style="line-height: 140%; font-size: 14px;"><span
                                                        style="line-height: 19.599999999999998px; font-size: 14px;"><strong><span
                                                                style="line-height: 19.599999999999998px; font-size: 14px;"><span
                                                                    style="font-size: 26px; line-height: 36.4px;">Vous avez
                                                                    une vente en cours !</span></span></strong></span></p>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style="font-family:'Montserrat',sans-serif;" role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tbody>
                                    <tr>
                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:44px 10px 10px;font-family:'Montserrat',sans-serif;"
                                            align="left">
                                            <table width="100%" cellspacing="0" cellpadding="0" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="padding-right: 0px;padding-left: 0px;" align="center">
                                                            <img src="{{asset('images/sale.png')}}" alt="Image" title="Image"
                                                                style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 13%;max-width: 75.4px;"
                                                                width="75.4" border="0" align="middle">
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style="font-family:'Montserrat',sans-serif;" role="presentation" width="100%"
                                cellspacing="0" cellpadding="0" border="0">
                                <tbody>
                                    <tr>
                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 33px;font-family:'Montserrat',sans-serif;"
                                            align="left">
                                            <div
                                                style="color: #686d6d; line-height: 210%; text-align: center; word-wrap: break-word;">
                                                <p style="font-size: 14px; line-height: 210%;">&nbsp;</p>
                                                <p style="font-size: 14px; line-height: 210%;">Félicitations vous avez une
                                                    ou plusieurs ventes en cours. Vous pouvez consulter vos ventes
                                                    directement depuis votre espace vendeur rubrique</p>
                                                <p style="font-size: 14px; line-height: 210%;">"Mes commandes"</p>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style="font-family:'Montserrat',sans-serif;" role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tbody>
                                    <tr>
                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;" align="left">
                                            <div align="center">                                        
                                                <a href="https://admin.click-games.fr" target="_blank" style="box-sizing: border-box;display: inline-block;font-family:'Montserrat',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #f1c40f; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;">
                                                    <span style="display:block;padding:10px 20px;line-height:120%;">Voir mes commandes en cours</span>
                                                </a>                                         
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>                            
                        </div>                      
                    </div>
                </div>            
            </div>
        </div>
    </div>
@endcomponent