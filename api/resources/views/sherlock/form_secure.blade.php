<?php
?>
<html>

<head>
    <title>Title for Page</title>
</head>

<body OnLoad="OnLoadEvent();">
    <form name="downloadForm" action="{{ $response['redirectionUrl'] }}" method="POST">
        <noscript>
            <br>
            <br>
            <center>
                <h1>Processing your 3-D Secure Transaction</h1>
                <h2>JavaScript is currently disabled or is not supported by your browser.<br></h2>
                <h3>Please click Submit to continue the processing of your 3-D Secure transaction.</h3>
                <input type="submit" value="Submit">
            </center>
        </noscript>
        <input type="hidden" name="PaReq" value="{{ $response['paReqMessage'] }}">
        <input type="hidden" name="TermUrl" value="{{ $termUrl }}">
        <input type="hidden" name="MD" value="{{ $MD }}">
    </form>
    <SCRIPT LANGUAGE="Javascript">
        
        function OnLoadEvent() {
            document.downloadForm.submit();
        }

    </SCRIPT>
</body>

</html>
