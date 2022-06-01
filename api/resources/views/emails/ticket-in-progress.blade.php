@component('mail::message', ['to' => $to[0]['address']])


<div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
   <!--<![endif]-->
   <table style="font-family:'Montserrat',sans-serif;" role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
      <tbody>
         <tr>
            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;" align="left">
               <div style="color: #34495e; line-height: 140%; text-align: center; word-wrap: break-word;">
                  <p style="line-height: 140%; font-size: 14px;"><span style="line-height: 19.599999999999998px; font-size: 14px;"><strong><span style="line-height: 19.599999999999998px; font-size: 14px;"><span style="font-size: 26px; line-height: 36.4px;">Litige en cours !</span></span></strong></span></p>
               </div>
            </td>
         </tr>
      </tbody>
   </table>
   <table style="font-family:'Montserrat',sans-serif;" role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
      <tbody>
         <tr>
            <td style="overflow-wrap:break-word;word-break:break-word;padding:44px 10px 10px;font-family:'Montserrat',sans-serif;" align="left">
               <table width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tbody>
                     <tr>
                        <td style="padding-right: 0px;padding-left: 0px;" align="center">
                           <img src="{{asset('images/warning.png')}}" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 13%;max-width: 75.4px;" width="75.4" border="0" align="middle">
                        </td>
                     </tr>
                  </tbody>
               </table>
            </td>
         </tr>
      </tbody>
   </table>
   <table style="font-family:'Montserrat',sans-serif;" role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
      <tbody>
         <tr>
            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 33px;font-family:'Montserrat',sans-serif;" align="left">
               <div style="color: #686d6d; line-height: 210%; text-align: center; word-wrap: break-word;">
                  <p style="font-size: 14px; line-height: 210%;">&nbsp;</p>
                  <p style="font-size: 14px; line-height: 210%;">Bonjour, nous vous informons que vous avez un litige en cours.</p>
                  <p style="font-size: 14px; line-height: 210%;">Vous pouvez consulter celui-ci ou y répondre directement depuis votre espace Click Games</p>
                  <p style="font-size: 14px; line-height: 210%;">&nbsp;</p>
                  <p style="font-size: 14px; line-height: 210%;">Un problème avec la commande d’un client ? Proposez-lui un remboursement, un échange ou même un avoir.</p>
                  <p style="font-size: 14px; line-height: 210%;">&nbsp;</p>
                  <p style="font-size: 14px; line-height: 210%;">En cas de problème, un agent Click Games peut intervenir pour régler la situation.</p>
               </div>
            </td>
         </tr>
      </tbody>
   </table>
   <!--[if (!mso)&(!IE)]><!-->
</div>


@endcomponent