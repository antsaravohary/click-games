
<!doctype html>
<html lang="fr">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>ERREUR</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
</head>

<body>
    <div class="card m-4">
        <div class="card-header text-danger">
            ERREUR - {{ $code }}
        </div>
        <div class="card-body">
            <h5 class="card-title"></h5>
            <p class="card-text text-danger">{{ $msg }}</p>
            <a onclick="parent.window.location.href='{{env('SHOP_URL')}}/checkout'" class="btn btn-primary">Retour</a>
        </div>
    </div>
</body>

</html>
