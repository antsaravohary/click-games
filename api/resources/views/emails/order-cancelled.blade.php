@component('mail::message', ['to' => $to[0]['address']])

    <div class=u-row-container style=padding:0;background-color:transparent>
        <div class=u-row
            style="Margin:0 auto;min-width:320px;max-width:600px;overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;background-color:#e8eced">
            <div style=border-collapse:collapse;display:table;width:100%;background-color:transparent>
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #e8eced;"><![endif]-->
                <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #fcfcfc;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                <div class="u-col u-col-100" style=max-width:320px;min-width:600px;display:table-cell;vertical-align:top>
                    <div style=background-color:#fcfcfc;width:100%!important>
                        <!--[if (!mso)&(!IE)]><!-->
                        <div
                            style="padding:0;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent">
                            <!--<![endif]-->
                            <table style=font-family:Montserrat,sans-serif role=presentation width=100% cellspacing=0
                                cellpadding=0 border=0>
                                <tbody>
                                    <tr>
                                        <td style=overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:Montserrat,sans-serif
                                            align=left>
                                            <div
                                                style=color:#34495e;line-height:140%;text-align:center;word-wrap:break-word>
                                                <p style=line-height:140%;font-size:14px><span
                                                        style=line-height:19.599999999999998px;font-size:14px><strong><span
                                                                style=line-height:19.599999999999998px;font-size:14px><span
                                                                    style=font-size:26px;line-height:36.4px>Commande annulée
                                                                </span></span></strong></span></p>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style=font-family:Montserrat,sans-serif role=presentation width=100% cellspacing=0
                                cellpadding=0 border=0>
                                <tbody>
                                    <tr>
                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:44px 10px 10px;font-family:Montserrat,sans-serif"
                                            align=left>
                                            <table width=100% cellspacing=0 cellpadding=0 border=0>
                                                <tbody>
                                                    <tr>
                                                        <td style=padding-right:0;padding-left:0 align=center>
                                                            <img src="{{asset('images/sad.png')}}" alt=Image title=Image
                                                                style=outline:0;text-decoration:none;-ms-interpolation-mode:bicubic;clear:both;display:inline-block!important;border:none;height:auto;float:none;width:13%;max-width:75.4px
                                                                width=75.4 border=0 align=middle>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style=font-family:Montserrat,sans-serif role=presentation width=100% cellspacing=0
                                cellpadding=0 border=0>
                                <tbody>
                                    <tr>
                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 33px;font-family:Montserrat,sans-serif"
                                            align=left>
                                            <div
                                                style=color:#686d6d;line-height:210%;text-align:center;word-wrap:break-word>
                                                <p style=font-size:14px;line-height:210%>&nbsp;</p>
                                                <p style=font-size:14px;line-height:210%>Bonjour,</p>
                                                <p style=font-size:14px;line-height:210%>Nous vous écrivons afin de vous
                                                    informer que votre commande a été annulée.</p>
                                                <p style=font-size:14px;line-height:210%>N°{{ $ref }}</p>
                                                <p style=font-size:14px;line-height:210%>Vous recevrez très prochainement un
                                                    mail pour vous confirmer le remboursement de cette commande.</p>
                                                <p style=font-size:14px;line-height:210%><br>&nbsp;</p>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                    </div>
                </div>
                <!--[if (mso)|(IE)]></td><![endif]-->
                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
            </div>
        </div>
    </div>

@endcomponent
