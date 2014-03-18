      $(document).ready(function() {
        
        var isLoading;
        var params = {
          'feature': 'popular',
          'term':'toronto',
          'consumer_key': 'MVMIjzAWM63MOzdT9zTJEfOrrxXqOM399E1h11Lc',
          'sort':'votes_count',
          'rpp':72,
          'image_size':2,
          'exlcude':'nude'

          // 500px API goes over all these parameters in their documentation.

        };
        
        function getPage() {

          if (isLoading) return;
          isLoading = true;
          ++params['page'];
          $.get('https://api.500px.com/v1/photos/search?' + $.param(params) , function(data) {

            markup = '';
            $.each(data.photos, function(key, photo) {
              markup += '<div class="photo">';
              markup += '<img src="' + photo.image_url + '" />';
              // markup += '<p>' + photo.description + '</p>';
              markup += '</div>';
               
            });

          
              if (params['page'] == 1) {

              $('.f00px').html(markup);
            }

            else {
              $('.f00px').append(markup);
            }
            
            isLoading = false;

          });
          console.log(params.page);
        }

        $(window).on('scroll', function() {
          
          var threshold = 100;
        
          if (window.innerHeight + document.body.scrollTop > document.body.clientHeight - threshold) {
            
            getPage();

            // Client height is the top of the page all the way to the bottom
            // innerHeight is the window size
            // scrollTop is have far down we are from the top of the screen
          }
        });

      
       getPage(1);
 
      });