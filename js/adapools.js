/* $.getJSON(
  "https://adapools.org/cache/pools/bd1d1aafead6f652f76f5921b4ffdb429d7eb9d5322d0f4700f4f70f997c5a82.json",
  (data) => {
    // $.each( data, function( i, val ) { $( '#' + data.id + '_' + i ).text(val); });
    document.querySelector("#pool-adress").innerHTML = data.id;
    document.querySelector("#pool-tag").innerHTML = data.tag;
    document.querySelector("#pool-total-stake").innerHTML = data.total_stake;
    document.querySelector("#pool-reward-value").innerHTML = data.lifetime_stakers;
    document.querySelector("#pool-tax-fixed").innerHTML = data.tax_fixed;
    document.querySelector("#pool-last-epoch").innerHTML = data.share + " %";
    document.querySelector("#pool-roa").innerHTML = data.roa;
    document.querySelector("#pool-roi").innerHTML = data.roi;
  }
); */
//livestats.json - iz ovog ide live stake, i lifetime blocks, a izgleda ovak {"livestake": 8733730395034, "updatedAt": 1588084002, "epochblocks": 2, "lifetimeblocks": 11, "lastBlockEpoch": 136}


window.location ="https://www.cpoolsunited.com/pool?id=VENUS"

let rho;
let tau;
let decentralisationParam;
let blocks;
let kParameter ;
let MaxAdaSupply = 45000000000;
let TotalAdaSupply;
let TotalAwardsAvailable;
let RewardsAfterTreasury;
let TotalActiveStake;
let FrescoActiveStake;
let FrescoBlocksProduced;
let RelativeBlocksProduced;
let RelativeActiveStake;
let a0;
let myPledge = 70000;
let apparentPoolPerformance;







async function getGlobalStats() {
  let response = await fetch(
  "https://js.adapools.org/global.json",
    {
      method: "GET",
      // headers: {
      //   'Content-Type': 'application/json;charset=utf-8',

      // },
    }
  );

  if (response.ok) {
   
    let json = await response.json();
    let totalStaked = parseFloat(json.total_staked_active)/1000000;
    let adaCirc = parseFloat(json.ada_circ)/1000000;

    $('.activeStakeTotal').val(Math.floor(totalStaked))
    $('.totalSupplyInput').val(adaCirc)
    $('.rewards-header').html(`Rewards calculator for current Epoch (${json.epoch_last})`)
    $('.cur-stats').html(`Stats for current Epoch (${json.epoch_last})`)


  } else {
    console.log("HTTP-Error: " + response.status);
  }
}




async function getLiveStats() {
  let response = await fetch(
    "https://js.adapools.org/pools/19cb138eab81d3559e70094df2b6cb1742bf275e920300d5c3972253/summary.json",
    {
      method: "GET",
      // headers: {
      //   'Content-Type': 'application/json;charset=utf-8',

      // },
    }
  );

  if (response.ok) {
    // if HTTP-status is 200-299
    // get the response body (the method explained below)
    let json = await response.json();
    let activeStake = json.data.active_stake
    let blocksEpoch = parseInt(json.data.blocks_epoch);
    FrescoBlocksProduced = blocksEpoch;
    let blocksEstimated = json.data.blocks_estimated;
    let blocksLifetime = parseInt(json.data.blocks_lifetime);
    // let delegators = json.data.delegators
    let totalStake = parseFloat(json.data.total_stake)
    let roa =  parseFloat(json.data.roa)
    // console.log(activeStake)
    // console.log(json)
    $('.currentEpochBlock').val(blocksEpoch)
    $('.activeStakeFresco').val(Math.floor(activeStake/1000000))


    // $liveStake = ($liveStake / 1000000 / 1000000).toFixed(2); //in million ADA
     $(".blocks-produced").html(blocksEpoch+blocksLifetime);


    $(".total-stake").html((totalStake/ 1000000 / 1000000).toFixed(2)+" M");
    $(".active-stake").html((activeStake/ 1000000 / 1000000).toFixed(2)+" M");
    $(".blocks-estimated").html((blocksEstimated))
    $(".blocks-produced-current").html(blocksEpoch);

    if (roa!=0){
     $(".ROAClass").html(roa+" %");


    }


    // $("#pool-total-blocks").html($lifetimeBlocks);
  } else {
    console.log("HTTP-Error: " + response.status);
  }
}


let RegExpr = new RegExp(/^\d*\.?\d*$/); 

function valid(elem) { 
 let val = elem.value
  if (RegExpr.test(elem.value)) { 
      val = elem.value; 
  } else { 
      elem.value = val.substring(0,val.length-1); 
 
  } 
}






const calculateRewards =()=>{

 

TotalActiveStake =     $('.activeStakeTotal').val()
FrescoActiveStake =  $('.activeStakeFresco').val()
TotalAdaSupply = $('.totalSupplyInput').val()
FrescoBlocksProduced =$('.currentEpochBlock').val()
let yourActiveStake = $('.activeStakeUser').val()
let totalReserves = MaxAdaSupply-TotalAdaSupply;
RelativeBlocksProduced = FrescoBlocksProduced/blocks
RelativeActiveStake = FrescoActiveStake/TotalActiveStake
TotalAwardsAvailable = totalReserves*rho
RewardsAfterTreasury = TotalAwardsAvailable*(1-tau)
let s = (70000/TotalAdaSupply);
let sigma = (FrescoActiveStake/TotalAdaSupply);
let saturationPoint = 1/kParameter

if (decentralisationParam >=0.8){

  apparentPoolPerformance = 1
}

else {
  apparentPoolPerformance = RelativeBlocksProduced/RelativeActiveStake

}



let realRewards;

let  optimalRewards = (RewardsAfterTreasury/(1+a0)) * (sigma + (s * a0) * (sigma - (s * ((saturationPoint - sigma)/saturationPoint)))/saturationPoint)

if (FrescoBlocksProduced <1){
   realRewards = 0


}
else{
 realRewards = (optimalRewards*apparentPoolPerformance).toFixed(2)
}
let margin = 0.0085;
let fixedFee = 340;
let afterFixed = realRewards-fixedFee
let rewardsTaxed =   (afterFixed*(1-margin)).toFixed(2)
if (realRewards<=0){

  realRewards=0;
  rewardsTaxed = 0;
}

let usersReward = (yourActiveStake/FrescoActiveStake)*(rewardsTaxed)

if (usersReward >=realRewards){

  usersReward = realRewards;
}

$(".realRewards").html(`Total estimated rewards calculation: ${realRewards}`);
$(".rewardsTax").html(`Total estimated rewards calculation after tax: ${rewardsTaxed}`);
$(".rewardsTaxUser").html(`Your estimated rewards: ${(usersReward).toFixed(2)}`);
//$(".estimatedROA").html(`Estimated ROA: ${((rewardsTaxed/FrescoActiveStake)*7200).toFixed(2)}%`);
  $(".estimatedROA").html(``);

$(".expectedBlocks").html(`Blocks expected: ${(blocks*RelativeActiveStake).toFixed(1)}`);





}




async function getParameterStats() {
  let response = await fetch(
    "https://js.adapools.org/protocol.json",
    {
      method: "GET",
      // headers: {
      //   'Content-Type': 'application/json;charset=utf-8',

      // },
    }
  );

  if (response.ok) {
    // if HTTP-status is 200-299
    // get the response body (the method explained below)
    let json = await response.json();
     rho = json.rho
     tau = json.tau;
     a0 = json.a0
     kParameter = json.nOpt
     decentralisationParam = json.decentralisationParam
     blocks =  21600 * (1-decentralisationParam);
    
//     console.log(rho, tau, decentralisationParam, a0, kParameter)
// console.log(json)



    
    // $(".ROAClass").html(roa);


    // $("#pool-total-blocks").html($lifetimeBlocks);
  } else {
    console.log("HTTP-Error: " + response.status);
  }
}














$.getJSON(
  "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=Ada&tsyms=BTC,USD,EUR&api_key=da5c2209128482ded3f5dabbe7260d828b351b7a62c6fc18a5f41fc8f336f12e",
  (data) => {
    $(".price-holder").html(
      `<a class="api-link" href="https://min-api.cryptocompare.com/" target="_blank">${data.RAW.ADA.USD.PRICE} USD</a>`
    );
  }
);


//epochstats.json  - iz ovog total rewards i performance history i ROI
// let $history = "";
// let $rewards = 0;
// let $roi = 0;
// let $epochCount = 0;
// let $averageStakePerEpoch = 0;
// $.getJSON(
//   "https://pooltool.s3-us-west-2.amazonaws.com/8e4d2a3/pools/bd1d1aafead6f652f76f5921b4ffdb429d7eb9d5322d0f4700f4f70f997c5a82/epochstats.json"
// ).done(function (data) {
//   $.each(data, function (i, item) {
//     if (data[i].hasOwnProperty("epochSlots")) {
//       //history
//       if (data[i].epochSlots == null) {
//         $history =
//           "Epoch " +
//           data[i].epoch +
//           " - 0" +
//           "/" +
//           data[i].blocks +
//           " blocks" +
//           "<br />" +
//           $history;
//       } else {
//         if (data[i].blocks != 0) {
//           if (data[i].epochSlots == 0) {
//             data[i].epochSlots = data[i].blocks;
//           }
//           $history =
//             "Epoch " +
//             data[i].epoch +
//             " - " +
//             data[i].blocks +
//             "/" +
//             data[i].epochSlots +
//             " blocks " +
//             (data[i].epochSlots === data[i].blocks ||
//             data[i].blocks > data[i].epochSlots
//               ? `<span>🌟</span>`
//               : "") +
//             "<br />" +
//             $history;
//         } else {
//           $history =
//             "Epoch " +
//             data[i].epoch +
//             " - " +
//             data[i].blocks +
//             "/" +
//             data[i].epochSlots +
//             " blocks" +
//             "<br />" +
//             $history;
//         }
//       }
//       $rewards += data[i].value_for_stakers; //in lovelace
//       $averageStakePerEpoch += data[i].blockstake; //in lovelace
//       $epochCount++;
//     }
//   });

//   //calculate roi
//   $averageStakePerEpoch = $averageStakePerEpoch / $epochCount;
//   $roi = $rewards / $averageStakePerEpoch;
//   $roi = ((Math.pow($roi + 1, 1 / ($epochCount / 365)) - 1) * 100).toFixed(1);
//   $("#pool-roi").html($roi + " %");

//   //calculate rewards in k ADA
//   $rewards = ($rewards / 1000000 / 1000).toFixed(1);
//   $("#pool-reward-value").html($rewards + " k ADA");

//   $("#history").html($history);
// });

//script for scroll

$(document).ready(() => {
  $(".ada-button").click(() => {
    $(".ada-button").toggleClass("toggle-show-ada-button");
    $(".price-container").toggleClass("show-ada");
  });

  getLiveStats();

  setTimeout(() => {
    $(".spinner").css("transform", `rotate(90deg) scale(1)`);



    document.querySelectorAll(".inputParam").forEach((element)=>{

      element.addEventListener('input', calculateRewards)
      // console.log(element)
      })
      


    setTimeout(() => {
      getParameterStats();
      getGlobalStats();
     
      $(".spinner").css("transform", `rotate(0deg) scale(1)`);

      setTimeout(() => {
        calculateRewards();
        $(window).scroll(() => {
          var scrollPos = $(document).scrollTop();

          $(".static_logo").css("transform", `rotate(${scrollPos * 0.3}deg) `);
          // $(".static_logo").css("filter", `hue-rotate(${scrollPos*1}deg) drop-shadow(0px 0px 40px var(--main-teal))`)

          // $(".logo_component").css("filter", `hue-rotate(${scrollPos*1}deg)`)
          // $(".logo_component").css("filter", `grayscale(${scrollPos*0.1})`)
        });
      }, 700);
    }, 900);
  }, 200);
});
