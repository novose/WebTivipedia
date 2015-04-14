/* programme actuel */
function launch_all($i)
{
    $part = 0;
    $channel = $i;
    $clientKey = "XXXXXXXXXXXXXXXXXXXXXXXXX";
    $clientId = "XXXXXXXXX";
    $url2 = "http://94.23.253.36:8080/TiVineWS_V1.0/GetAllContentForPartAndChannel";
    $message = $url2+$part+$channel+$clientId;
    $hash = CryptoJS.HmacSHA512($message, $clientKey).toString();
    $.ajax({
	url : $url2,
	type : 'POST',
	data : {"clientId" : $clientId, "part": $part, "channel": $channel, "encodedKey" : $hash},
	success : function(data){
	    $("#chaine_info_"+$i).empty();
	    $("#chaine_info_"+$i).append($("<h3></h3>").attr({"id" : "title_"+$i, "style" : "font-size : 92px", "class" : "section-heading"}).text(data.programs[0].channel));
	    $("#chaine_info_"+$i).append($("<p></p>").attr({"id": "desc_"+$i, "class" : "item-intro text-muted", "style" : "font-size : 24px"}).text(data.programs[0].title));
	    var imageRegex = /http[^\"|'|?]*.(?:jpg|gif|jpeg|png|tiff|bmp)/;
            $img = imageRegex.exec(data.programs[0].image);
	    $("#chaine_info_"+$i).append($("<img></img>").attr({"id" : "im_"+$i, "class" : "img-responsive", "src" : $img, "onError":"this.onerror=null;this.src='img/unnamed.png'"}).append("<br>"));
	    if (data.programs[0].desc){
		$("#chaine_info_"+$i).append($("<p></p>").attr("id", "desc_"+$i).text(data.programs[0].desc));
	    }
	    get_all_content_for_part_and_channel($i);
	    prgm_next($i);
	},
	error : function(data){
	    console.log(data);
	}
    });
}

/* Programme suivant */
function prgm_next($i)
{
    $clientId = "XXXXXXXXX";
    $clientKey = "XXXXXXXXXXXXXXXXXXXXXXXXX";
    $url2 = "http://94.23.253.36:8080/TiVineWS_V1.0/GetAllContentForPart";
    $message = $url2+1+$clientId;
    $hash = CryptoJS.HmacSHA512($message, $clientKey).toString();
    $.ajax({
        url : $url2,
        type : 'POST',
        data : {"clientId" : $clientId, "part" : 1, "encodedKey" : $hash},
        success : function(data){
	    $("#chaine_info_"+$i).append($("<div></div>").attr("id", "div_next"));
	    $i--;
	    $newDate = data.programs[$i].startTime[8] + data.programs[$i].startTime[9] + 'h' + data.programs[$i].startTime[10] + data.programs[$i].startTime[11]; 
	    $("#div_next").append("<br><br><br><br><br><br>").append($("<p></p>").attr({"id": "desc2_1", "style" : "font-size : 26px"}).css("font-weight","bold").text('Prochain programme : '+data.programs[$i].title+' à '+ $newDate));
            var imageRegex = /http[^\"|'|?]*.(?:jpg|gif|jpeg|png|tiff|bmp)/;
	    $img = imageRegex.exec(data.programs[$i].image);
	    $("#div_next").append($("<img></img>").attr({"id" : "im2_1", "class" : "img-responsive", "src" : $img, "onError":"this.onerror=null;this.src='img/unnamed.png'"}));
	    if (data.programs[$i].desc){
		$("#div_next").append($("<p></p>").attr("id", "desc2_1").text(data.programs[$i].desc));
	    }
	    votre_soiree($i+1);
	},
        error : function(data){
            console.log(data);
        }
    });
}

/* Programme debut de soiree */
function votre_soiree($i)
{
    $clientId = "XXXXXXXXX";
    $clientKey = "XXXXXXXXXXXXXXXXXXXXXXXXX";
    $url2 = "http://94.23.253.36:8080/TiVineWS_V1.0/GetAllContentForPart";
    $message = $url2+2+$clientId;
    $hash = CryptoJS.HmacSHA512($message, $clientKey).toString();
    $.ajax({
        url : $url2,
        type : 'POST',
        data : {"clientId" : $clientId, "part" : 2, "encodedKey" : $hash},
        success : function(data){
	    $("#chaine_info_"+$i).append($("<div></div>").attr("id", "div_soiree"));
	    $i--;
            $newDate = data.programs[$i].startTime[8] + data.programs[$i].startTime[9] + 'h' + data.programs[$i].startTime[10] + data.programs[$i].startTime[11];
            $("#div_soiree").append($("<p></p>").attr({"id": "desc2_1", "style" : "font-size : 26px"}).css("font-weight","bold").text('Votre soiree : '+data.programs[$i].title+' à '+ $newDate))
            var imageRegex = /http[^\"|'|?]*.(?:jpg|gif|jpeg|png|tiff|bmp)/;
            $img = imageRegex.exec(data.programs[$i].image);
            $("#div_soiree").append($("<img></img>").attr({"id" : "im2_1", "class" : "img-responsive", "src" : $img, "onError":"this.onerror=null;this.src='img/unnamed.png'"}));
            if (data.programs[$i].desc){
		$("#div_soiree").append($("<p></p>").attr("id", "desc2_1").text(data.programs[$i].desc));
	    }
	    fin_de_soiree($i+1);
        },
        error : function(data){
            console.log(data);
        }
    });

}

/* programme fin de soiree */
function fin_de_soiree($i)
{
    $clientId = "XXXXXXXXX";
    $clientKey = "XXXXXXXXXXXXXXXXXXXXXXXXX";
    $url2 = "http://94.23.253.36:8080/TiVineWS_V1.0/GetAllContentForPart";
    $message = $url2+3+$clientId;
    $hash = CryptoJS.HmacSHA512($message, $clientKey).toString();
    $.ajax({
        url : $url2,
        type : 'POST',
        data : {"clientId" : $clientId, "part" : 3, "encodedKey" : $hash},
        success : function(data){
	    $("#chaine_info_"+$i).append($("<div></div>").attr("id", "div_nuit"));
	    $i--;
            $newDate = data.programs[$i].startTime[8] + data.programs[$i].startTime[9] + 'h' + data.programs[$i].startTime[10] + data.programs[$i].startTime[11];
            $("#div_nuit").append($("<p></p>").attr({"id": "desc2_1", "style" : "font-size : 26px"}).css("font-weight","bold").text('Suivi de : '+data.programs[$i].title+' à '+ $newDate))
            var imageRegex = /http[^\"|'|?]*.(?:jpg|gif|jpeg|png|tiff|bmp)/;
            $img = imageRegex.exec(data.programs[$i].image);
            $("#div_nuit").append($("<img></img>").attr({"id" : "im2_1", "class" : "img-responsive", "src" : $img, "onError":"this.onerror=null;this.src='img/unnamed.png'"}));
	    if (data.programs[$i].desc){
		$("#div_nuit").append($("<p></p>").attr("id", "desc2_1").text(data.programs[$i].desc));
	    }
	},
        error : function(data){
            console.log(data);
        }
    });
}

/* Affichage de tout les pepoles, lieux -> stamps cites */
function get_all_content_for_part_and_channel($i)
{
    $part = 0;
    $channel = $i;
    $clientId = "XXXXXXXXX";
    $clientKey = "XXXXXXXXXXXXXXXXXXXXXXXXX";
    $url2 = "http://94.23.253.36:8080/TiVineWS_V1.0/GetAllContentForPartAndChannel";
    $message = $url2+$part+$channel+$clientId;
    $hash = CryptoJS.HmacSHA512($message, $clientKey).toString();
    $.ajax({
	url : $url2,
	type : 'POST',
        data : {"clientId" : $clientId, "part" : $part, "channel" : $channel, "encodedKey" : $hash},
	success : function(data){
	    count = 0;
	    console.log(data);
	    for ($k = 0 ; $k <= data.stamps.length -1; $k++, count++)
	    {
		console.log(data);
		
		$("#chaine_info_"+$i).append($("<div></div>").attr("id", "chaine_content_"+$k).css({"margin-top":"10px", "background-color":"#ffffff"}));
		$("#chaine_content_"+$k).append("<br>").append($('<a></a>').attr({"id": "found_"+$i, "href": data.stamps[$k].detailUrl, "style":"font-size:28px", "target":"_blank"}).text(data.stamps[$k].name));
		$("#chaine_content_"+$k).append($('<p></p>').text(data.stamps[$k].type));
		$("#chaine_content_"+$k).append($("<img></img>").attr({"id" : "imgg2_"+$i, "class" : "img-responsive", "src" : data.stamps[$k].image, "onError":"this.onerror=null;this.src='img/unnamed.png'"}).css({"height":"250px", "margin-bot":"10px"}));
		description(data, count, $clientId, $clientKey)
 	    }
	},
	error : function(data){
	    console.log(data);
	}
    });
}
/* description des Stamps */
function description(data, count, $clientId, $clientKey)
{
    $url2 = "http://94.23.253.36:8080/TiVineWS_V1.0/GetStampContent";
    $message = $url2+data.stamps[count].stampId+$clientId;
    $hash = CryptoJS.HmacSHA512($message, $clientKey).toString();
    $.ajax({
	url : $url2,
	type : 'POST',
	data : {"clientId" : $clientId, "stampId" : data.stamps[count].stampId, "encodedKey" : $hash},
	success : function(data){
	    console.log(data)
	    if (data.stampData){
		$("#chaine_content_"+count).append($("<div></div>").attr({"id":"desc_stamp_"+count,"style":"width:720px"}));
		$("#desc_stamp_"+count).append($("<p></p>").attr({"text":"align: center"}).css({"margin-right":"15px", "margin-left":"10px"}).text(data.stampData.desc));}
	},
	error : function(data){
	    console.log(data);
	}
    });
}

/* Affichage des programme des premieres chaines sur la page de base */
function programme_tv()
{
    $part = 0;
    $clientId = "XXXXXXXXX";
    $clientKey = "XXXXXXXXXXXXXXXXXXXXXXXXX";
    $url2 = "http://94.23.253.36:8080/TiVineWS_V1.0/GetAllContentForPart";
    $message = $url2+$part+$clientId;
    $hash = CryptoJS.HmacSHA512($message, $clientKey).toString();
    $.ajax({
        url : $url2,
        type : 'POST',
        data : {"clientId" : $clientId, "part" : $part, "encodedKey" : $hash},
        success : function(data){
            programme_tv_count(data);
        },
        error : function(data){
            console.log(data);
        }
    });
}
/* affichage des 6 premieres chaines uniquement */
function programme_tv_count(data)
{
    for ($i = 0; $i <= 5; $i++)
    {
        $img = data.programs[$i].image;
        var imageRegex = /http[^\"|'|?]*.(?:jpg|gif|jpeg|png|tiff|bmp)/;
        $img = imageRegex.exec($img);
        $('#chaine'+$i).append($("<img></img>").attr({"id" : "img_chaine_"+$i+"_info", "class":"img-responsive", "src" : $img, "style" : "height: 100px; margin:auto", "onError":"this.onerror=null;this.src='img/unnamed.png'"}));
        $('#chaine'+$i).append($("<p></p>").text(data.programs[$i].title).attr("id", "name_info"));
    }
}