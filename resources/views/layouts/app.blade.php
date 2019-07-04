<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>San Pablo City | @yield('title')</title>
    {{-- <link rel="icon" href={!! asset('image/spc_small.png')!!}/> --}}
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.css" media="screen">
    <script src="//cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.js"></script>
    <link rel="stylesheet" href="/css/app.css">
		<script src="/js/app.js"></script>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">


  </head>
  <body>
    @include('inc.preloader')
    <div>
      @include('inc.navbar')
      <div class="container-fluid pt-4">
        <div class="row">
          <div class="col-lg-12">
            @yield('content')
          </div>
        </div>
      </div>
    </div>
        @include('inc.footer')
    </body>
  </html>
