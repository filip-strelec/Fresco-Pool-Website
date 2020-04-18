$.getJSON(
  "https://adapools.org/cache/pools/bd1d1aafead6f652f76f5921b4ffdb429d7eb9d5322d0f4700f4f70f997c5a82.json",
  (data) => {
    // $.each( data, function( i, val ) { $( '#' + data.id + '_' + i ).text(val); });

    // console.log(data)

    $("#pool-adress").text(data.id);
    $("#pool-tag").text(data.tag);
    $("#pool-total-stake").text(data.total_stake);
    $("#pool-reward-value").text(data.rewards_value_for_stakers);
    $("#pool-tax-fixed").text(data.tax_fixed);
    $("#pool-last-epoch").text(data.last_epoch);
    $("#pool-roa").text(data.roa);
    $("#pool-roi").text(data.roi);
  }
);

let $history = "";
$.getJSON(
  "https://pooltool.s3-us-west-2.amazonaws.com/8e4d2a3/pools/bd1d1aafead6f652f76f5921b4ffdb429d7eb9d5322d0f4700f4f70f997c5a82/epochstats.json"
).done(function (data) {
  $.each(data, function (i, item) {
    if (data[i].hasOwnProperty("epochSlots")) {
      if (data[i].epochSlots == null) {
        $history =
          "Epoch " +
          data[i].epoch +
          " - 0" +
          "/" +
          data[i].blocks +
          " blocks" +
          "<br />" +
          $history;
      } else {
        $history =
          "Epoch " +
          data[i].epoch +
          " - " +
          data[i].epochSlots +
          "/" +
          data[i].blocks +
          " blocks" +
          "<br />" +
          $history;
      }
    }
  });
  $("#history").html($history);
});

//script for scroll

$(document).ready(() => {
  setTimeout(() => {
    $(".spinner").css("transform", `rotate(90deg) scale(1)`);

    setTimeout(() => {
      $(".spinner").css("transform", `rotate(0deg) scale(1)`);

      setTimeout(() => {
        $(window).scroll(() => {
          var scrollPos = $(document).scrollTop();

          $(".static_logo").css("transform", `rotate(${scrollPos * 0.3}deg)`);
          // $(".static_logo").css("filter", `hue-rotate(${scrollPos*1}deg)`)

          // $(".logo_component").css("filter", `hue-rotate(${scrollPos*1}deg)`)
          // $(".logo_component").css("filter", `grayscale(${scrollPos*0.1})`)
        });
      }, 600);
    }, 750);
  }, 200);
});
