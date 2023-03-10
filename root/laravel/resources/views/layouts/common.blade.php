<!doctype html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1.0, minimum-scale=1.0">
    <title>{{ env('APP_NAME') }}</title>
    @include('includes.tagmanager1')
    <script src="https://kit.fontawesome.com/e8bda5d631.js" crossorigin="anonymous"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    {{--    Font    --}}
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;400;700;900&display=swap" rel="stylesheet">

    {{--    Style    --}}
    <link rel="stylesheet" href="{{ Asset::css( '/style.css') }}?ver={{ Version::VER() }}">

    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body>
@include('includes.tagmanager2')
@include('includes.ajaxing')
@include('includes.header')

<main class="section">
    @yield('content')
</main>

@include('includes.footer')

<script src="{{ Asset::js('/script.js') }}?ver={{ Version::VER() }}"></script>
</body>
</html>
