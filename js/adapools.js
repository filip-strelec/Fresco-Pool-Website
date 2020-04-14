$.getJSON('https://adapools.org/cache/pools/bd1d1aafead6f652f76f5921b4ffdb429d7eb9d5322d0f4700f4f70f997c5a82.json', function(data) {
    $.each( data, function( i, val ) { $( '#' + data.id + '_' + i ).text(val); });
    });