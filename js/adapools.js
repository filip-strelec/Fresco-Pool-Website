



const epochDescription=(epoch, description)=>{

  epochContainer.forEach(element => {

    if(element.innerHTML.includes(epoch))    element.innerHTML=`${element.innerHTML}<div class="block-description">${description}</div>`


});

}



$.getJSON(
  "https://adapools.org/cache/pools/bd1d1aafead6f652f76f5921b4ffdb429d7eb9d5322d0f4700f4f70f997c5a82.json",
  (data) => {
    // $.each( data, function( i, val ) { $( '#' + data.id + '_' + i ).text(val); });

    // console.log(data)

    $("#pool-adress").text(data.id);
    $("#pool-tag").text(data.tag);
    $("#pool-total-stake").text(data.total_stake);
    $("#pool-reward-value").text(data.lifetime_stakers);
    $("#pool-tax-fixed").text(data.tax_fixed);
    $("#pool-last-epoch").text(data.share + " %");
    $("#pool-roa").text(data.roa);
    $("#pool-roi").text(data.roi);
  }
);


$.getJSON(
  "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=Ada&tsyms=BTC,USD,EUR&api_key=da5c2209128482ded3f5dabbe7260d828b351b7a62c6fc18a5f41fc8f336f12e",
  (data) => {

    $(".price-holder").html(`<a class="api-link" href="https://min-api.cryptocompare.com/" target="_blank">${data.RAW.ADA.USD.PRICE} USD</a>`);
  }
);


let $history = "";
let epochContainer="";
$.getJSON(
  "https://pooltool.s3-us-west-2.amazonaws.com/8e4d2a3/pools/bd1d1aafead6f652f76f5921b4ffdb429d7eb9d5322d0f4700f4f70f997c5a82/epochstats.json"
).done(function (data) {
  $.each(data, function (i, item) {
    if (data[i].hasOwnProperty("epochSlots")) {

      if (data[i].epochSlots == null) {

        $history =
<<<<<<< HEAD
        "<div class='epoch'>" + "Epoch " +
          data[i].epoch +
          " - 0" +
          "/" +
          data[i].blocks +
          " blocks</div>" +
          $history;
=======
          "Epoch " + data[i].epoch + " - 0" + "/" + data[i].blocks + " blocks" + "<br />" + $history;
>>>>>>> 91775972e672943801aacd7adb5fe994fd23892f
      } else {
        if (data[i].blocks != 0) {
          $history = "Epoch " + data[i].epoch + " - " + data[i].blocks + "/" + data[i].epochSlots + " blocks " +  ((data[i].epochSlots === data[i].blocks || data[i].blocks > data[i].epochSlots) ? (`<span>🌟</span>`) : ("")) + "<br />" + $history;
        }
        else {
          $history = "Epoch " + data[i].epoch + " - " + data[i].blocks + "/" + data[i].epochSlots + " blocks" + "<br />" + $history;
        }
      }
    }
  });
  $("#history").html($history);
  epochContainer=document.querySelectorAll(".epoch");


  //ADD EPOCH DESCRIPTION
  epochDescription("Epoch 134",`
  VENUS LOST ITS FIRST HEIGHT BATTLE <BR/>(1 WIN: 1 LOOSE) AT THE MOMENT
  <BR/>
  [ VENUS ] You lost! 😤
  <BR/>
  ⚔️ Height battle: STKH vs VENUS
  <BR/>
  ⏱ Slot: 134.34103 vs 134.34126
  <BR/>
  🧱 Height: 474307`);




});

//script for scroll

$(document).ready(() => {
  $(".ada-button").click(() => {
    $(".ada-button").toggleClass("toggle-show-ada-button");
    $(".price-container").toggleClass("show-ada");

  });


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
      }, 700);
    }, 900);
  }, 200);
});


