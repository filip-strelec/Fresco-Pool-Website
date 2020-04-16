$.getJSON('https://adapools.org/cache/pools/bd1d1aafead6f652f76f5921b4ffdb429d7eb9d5322d0f4700f4f70f997c5a82.json', (data)=> {

    // $.each( data, function( i, val ) { $( '#' + data.id + '_' + i ).text(val); });

// console.log(data)

$("#pool-adress").text(data.id)
$("#pool-tag").text(data.tag)
$("#pool-total-stake").text(data.total_stake)
$("#pool-reward-value").text(data.rewards_value_for_stakers)
$("#pool-tax-fixed").text(data.tax_fixed)
$("#pool-last-epoch").text(data.last_epoch)
$("#pool-roa").text(data.roa)
$("#pool-roi").text(data.roi)






    });

    //script for scroll

    $(window).scroll(()=>{
        var scrollPos = $(document).scrollTop();
        

        $(".spinner").css("transform", `rotate(${scrollPos*0.3}deg)`)
        $(".logo_component").css("filter", `hue-rotate(${scrollPos*1}deg)`)

       


    });