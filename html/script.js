addEventListener("message", function (event) {
  var poy = event.data;
  if (poy.show == true) {
    GetGelecek();
    console.log(poy.admin);
    if (poy.admin == true) {
      $(".add").fadeIn();
    } else {
      $(".add").fadeOut();
    }
    $(".playername").html(poy.name);
    $(".maincon").fadeIn();
  } else {
    $(".maincon").fadeOut();
  }
});
let bgImg = "belirlebmemis";
let gpsloc = "vector3(24,24,24)";

function GetHepsi() {
  $(".events").html("");
  $.post("https://poyetkinlik/hepsi", JSON.stringify({}), function (events) {
    if (events.length) {
      let sappendHTML = "";
      console.log(events.length);
      for (let gut = 0; gut < events.length; gut++) {
        const element = events[gut];
        console.log(element);
        sappendHTML =
          sappendHTML +
          `
                <button class="newresult"  id="option" data-id = ${gut}>
                    <div class="fulldiv">
                        <h2 class="eventtitle">${element.title}</h2>
                        <div class="datecircle">
                            <h2 class="dateday">${element.day}</h2>
                            <h2 class="datemonth">${element.kisaltma}</h2>
                        </div>
                        
                        <p class="desc">
                            ${element.desc}
                        </p>
                        
                    </div>
                </button>
             `;
      }
      $(".events").append(sappendHTML);
      $(".newresult").click(function () {
        console.log("cliccked");

        let gerekenid = $(this).data("id");
        $.post(
          "https://poyetkinlik/hepsi",
          JSON.stringify({}),
          function (events) {
            const gerekenelement = events[gerekenid];
            $(".detaylitit").html(gerekenelement.title);
            let yenitarih =
              gerekenelement.tamtarih + " - " + gerekenelement.saat;
            $(".eventdesc").html(gerekenelement.uzundesc);
            let oldurl = gerekenelement.link;
            console.log(gerekenelement.link);
            let baseurl =
              "https://www.imgacademy.com/themes/custom/imgacademy/images/helpbox-contact.jpg";
            let newurl = baseurl.replace(
              "www.imgacademy.com/themes/custom/imgacademy/images/helpbox-contact.jpg",
              oldurl
            );
            console.log(newurl);
            $(".eventback").css("background", "url(" + oldurl + ")");
            $(".eventback").css("background-size", "cover");
            $(".usertarih").html(yenitarih);

            $(".userganiser").html(gerekenelement.organize);
            gpsloc = gerekenelement.gps;
            console.log(gpsloc);
          }
        );
        $(".vignette").fadeIn();
        $(".detaylar").fadeIn();
        detaylarfaded = true;
      });
      console.log(bgImg);
    }
  });
}

function setURL(link) {
  console.log(link);
  $(".eventback").css({
    "background-image": "url('" + link + "')",
  });
}

function GetGecmis() {
  $(".events").html("");
  $.post("https://poyetkinlik/hepsi", JSON.stringify({}), function (events) {
    if (events.length) {
      let appendHTML = "";
      console.log(events.length);
      for (let gut = 0; gut < events.length; gut++) {
        const element = events[gut];
        console.log(element.toplamsaniye);
        if (element.toplamsaniye < 0) {
          appendHTML =
            appendHTML +
            `
                    <button class="newresult"  id="option" data-id = ${gut}>
                        <div class="fulldiv">
                            <h2 class="eventtitle">${element.title}</h2>
                            <div class="datecircle">
                                <h2 class="dateday">${element.day}</h2>
                                <h2 class="datemonth">${element.kisaltma}</h2>
                            </div>
                            
                            <p class="desc">
                                ${element.desc}
                            </p>
                            
                        </div>
                    </button>
                    `;
        }
      }
      $(".events").append(appendHTML);
      $(".newresult").click(function () {
        console.log("cliccked");

        let gerekenid = $(this).data("id");
        $.post(
          "https://poyetkinlik/hepsi",
          JSON.stringify({}),
          function (events) {
            const gerekenelement = events[gerekenid];
            $(".detaylitit").html(gerekenelement.title);
            let yenitarih =
              gerekenelement.tamtarih + " - " + gerekenelement.saat;
            $(".eventdesc").html(gerekenelement.uzundesc);
            let oldurl = gerekenelement.link;
            console.log(gerekenelement.link);
            let baseurl =
              "https://www.imgacademy.com/themes/custom/imgacademy/images/helpbox-contact.jpg";
            let newurl = baseurl.replace(
              "www.imgacademy.com/themes/custom/imgacademy/images/helpbox-contact.jpg",
              oldurl
            );
            console.log(newurl);
            $(".eventback").css("background", "url(" + oldurl + ")");
            $(".eventback").css("background-size", "cover");
            $(".usertarih").html(yenitarih);

            $(".userganiser").html(gerekenelement.organize);
            gpsloc = gerekenelement.gps;
            console.log(gpsloc);
          }
        );
        $(".vignette").fadeIn();
        $(".detaylar").fadeIn();
        detaylarfaded = true;
      });
      console.log(bgImg);
    }
  });
}

function GetGelecek() {
  $(".events").html("");
  $.post("https://poyetkinlik/hepsi", JSON.stringify({}), function (events) {
    if (events.length) {
      let sappendHTML = "";
      console.log(events.length);

      for (let gut = 0; gut < events.length; gut++) {
        console.log(gut);
        const element = events[gut];
        console.log(element.toplamsaniye);
        console.log(element.title);
        if (element.toplamsaniye > 0) {
          sappendHTML =
            sappendHTML +
            `
                    <button class="newresult"  id="option" data-id = ${gut}>
                        <div class="fulldiv">
                            <h2 class="eventtitle">${element.title}</h2>
                            <div class="datecircle">
                                <h2 class="dateday">${element.day}</h2>
                                <h2 class="datemonth">${element.kisaltma}</h2>
                            </div>
                            
                            <p class="desc">
                                ${element.desc}
                            </p>
                            
                        </div>
                    </button>
                    `;
        }
      }
      $(".events").append(sappendHTML);
      let total = $(".newresult").length;
      console.log(total);
      $(".newresult").click(function () {
        console.log("cliccked");

        let gerekenid = $(this).data("id");
        $.post(
          "https://poyetkinlik/hepsi",
          JSON.stringify({}),
          function (events) {
            const gerekenelement = events[gerekenid];
            $(".detaylitit").html(gerekenelement.title);
            let yenitarih =
              gerekenelement.tamtarih + " - " + gerekenelement.saat;
            $(".eventdesc").html(gerekenelement.uzundesc);
            let oldurl = gerekenelement.link;
            console.log(gerekenelement.link);
            let baseurl =
              "https://www.imgacademy.com/themes/custom/imgacademy/images/helpbox-contact.jpg";
            let newurl = baseurl.replace(
              "www.imgacademy.com/themes/custom/imgacademy/images/helpbox-contact.jpg",
              oldurl
            );
            console.log(newurl);
            $(".eventback").css("background", "url(" + oldurl + ")");
            $(".eventback").css("background-size", "cover");
            $(".usertarih").html(yenitarih);

            $(".userganiser").html(gerekenelement.organize);
            gpsloc = gerekenelement.gps;
            console.log(gpsloc);
          }
        );
        $(".vignette").fadeIn();
        $(".detaylar").fadeIn();
        detaylarfaded = true;
      });
      console.log(bgImg);
    }
  });
}

$(".eventiartikekle").click(function () {
  console.log("cliccked");
  var adinput = $(".eventismi").val();
  var bginput = $(".eventfotosu").val();
  var descinput = $(".inputdesc").val();
  var dayinput = $(".etkingunu").val();
  var saatinput = $(".etkinsaati").val();
  var duzeninput = $(".etkinorganizator").val();
  var gpsinput = $(".inputgps").val();
  var kisainput = $(".kisaca").val();
  let gpss = gpsinput.replace(/ /g, "");
  if (
    !adinput == "" &&
    !bginput == "" &&
    !descinput == "" &&
    !dayinput == "" &&
    !saatinput == "" &&
    !duzeninput == "" &&
    !gpsinput == "" &&
    !kisainput == ""
  ) {
    $.post(
      "https://poyetkinlik/eventekle",
      JSON.stringify({
        ad: adinput,
        link: bginput,
        uzundesc: descinput,
        tamtarihi: dayinput,
        saat: saatinput,
        orginasator: duzeninput,
        vector: gpss,
        kisadesc: kisainput,
      })
    );
    $(".eventekle").fadeOut();
    addedin = false;
  }
});

let detaylarfaded = false;
let addedin = false;

/*isRolePresent(user, role, callback)*/

$(".add").click(function () {
  if (detaylarfaded == true) {
    console.log("cliccked is true");
  } else {
    $(".eventismi").val("");
    $(".eventfotosu").val("");
    $(".inputdesc").val("");
    $(".etkingunu").val("");
    $(".etkinsaati").val("");
    $(".etkinorganizator").val("");
    $(".inputgps").val("");
    $(".kisaca").val("");
    $(".ornetknamm").html("");
    $(".ornkezri").html("");
    $(".ornekzaman").html("");
    $("#oaef").html("");
    console.log("detlay is false");
    $(".eventekle").fadeIn();
  }
  addedin = true;
});

$(".exit").click(function () {
  $(".detaylar").fadeOut();
  detaylarfaded = false;
});

$(".homebutton").click(function () {
  $(".detaylar").fadeOut();
  $(".eventekle").fadeOut();
  detaylarfaded = false;
  addedin = false;
});

$(".hepsi").click(function () {
  console.log("cliccked");
  GetHepsi();
});

$(".gelecek").click(function () {
  console.log("cliccked");
  GetGelecek();
});

$(".eski").click(function () {
  console.log("cliccked");
  GetGecmis();
});
document.onkeyup = function (data) {
  if (data.which == 27) {
    if (detaylarfaded == true) {
      $(".vignette").fadeOut();
      $(".detaylar").fadeOut();
      detaylarfaded = false;
    } else if (addedin == true) {
      $(".eventekle").fadeOut();
      addedin = false;
    } else {
      $(".maincon").fadeOut();
      $.post("https://poyetkinlik/kapat", JSON.stringify({}));
      $(".events").html("");
    }
  }
};

setInterval(function () {
  if (addedin == true) {
    var adinput = $(".eventismi").val();
    var bginput = $(".eventfotosu").val();
    var descinput = $(".inputdesc").val();
    var dayinput = $(".etkingunu").val();
    var saatinput = $(".etkinsaati").val();
    var duzeninput = $(".etkinorganizator").val();
    if (!adinput == "") {
      console.log(adinput);
      $(".ornetknamm").html(adinput);
    }
    if (!bginput == "") {
      console.log("bgodru");
      let weblink = "url(" + bginput + ")";
      $(".ongorubg").css("background", weblink);
      $(".ongorubg").css("background-size", "cover");
    }
    if (!descinput == "") {
      $("#uffq").html(descinput);
    }
    if (!saatinput == "") {
      if (!dayinput == "") {
        timedayinput = dayinput + " " + saatinput;
        $(".ornekzaman").html(timedayinput);
      }
    }
    if (!duzeninput == "") {
      $(".ornekorganisator").html(duzeninput);
    }
  }
}, 1000);

$(".isaret").click(function () {
  console.log("cliccked");
  console.log(gpsloc);
  let yeniloc = gpsloc.replace("vector3", "");
  yeniloc = yeniloc.replace(/,/g, " ");
  yeniloc = yeniloc.replaceAll("(", "");
  yeniloc = yeniloc.replaceAll(")", "");
  console.log(yeniloc);
  $.post("https://poyetkinlik/gps", JSON.stringify({ data: yeniloc }));
});
