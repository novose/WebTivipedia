/* Affichage des programme manquant sur la page de base */
function programme_tv2()
{   
    $part = 0;
    $clientId = "XXXXXXXXXXXXX";
    $clientKey = "XXXXXXXXXXXXXXXXXXXXXXX";
    $url2 = "http://94.23.253.36:8080/TiVineWS_V1.0/GetAllContentForPart";
    $message = $url2+$part+$clientId;
    $hash = CryptoJS.HmacSHA512($message, $clientKey).toString();
    $.ajax({
        url : $url2,
        type : 'POST',
        data : {"clientId" : $clientId, "part" : $part, "encodedKey" : $hash},
        success : function(data){
	    programme_tv_count2(data);
        },
        error : function(data){
            console.log(data);
        }
    });
}
/* Affichage des dernieres chaines */
function programme_tv_count2(data)
{
    for ($i = 6; $i <= 35; $i++)
    {
	$img = data.programs[$i].image;
	var imageRegex = /http[^\"|'|?]*.(?:jpg|gif|jpeg|png|tiff|bmp)/;
	$img = imageRegex.exec($img);
	$i++;
	$('#chaine'+$i).append($("<img></img>").attr({"id" : "img_chaine_"+$i+"_info", "class":"img-responsive", "src" : $img, "style" : "height: 100px; margin:auto", "onError":"this.onerror=null;this.src='http://dystopiedotnet.files.wordpress.com/2012/02/cest-de-la-merde-jpcoffe.jpg'"}));
	$('#chaine'+$i).append($("<p></p>").text(data.programs[$i-1].title));
	$i--;
    }
}