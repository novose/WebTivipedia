function view_all_channel(){
    var i = 7;
    var c = 0;
    
    var arr = ["Arte", "Direct8", "W9", "TMC", "NT1", "NR12", "LCP", "France4", "BFM TV", "Itele", "D17", "Gulli", "FranceÔ",
	       "HD1", "Equipe21", "6ter", "Numero23", "RMC", "Cherie25", "RTL9", "AB1", "TV5monde", "ParamountChannel",
	       "Paris Premiere", "Canal + Cinema", "Canal + Sport", "Canal + Family", "Canal + Decale", "BeIn Sport1", "BeIn Sport2"];    
    
    
    for (; i<37; i++,c++){
	var clone = $("#last_channel").clone().appendTo($("#last_channel").parent());
	clone.removeAttr("id");
	clone.css("display", "none");
	$("#clic_channel").remove();
	clone.find("#link").attr('onclick', "launch_all("+i+")").attr('href', "#portfolioModal"+i);
	
	clone.find("#image").attr('src', "img/chaines/0"+i+".png");
	
	clone.find("#namechannel").empty();
	clone.find("#img_chaine_5_info").remove();
	clone.find("#name_info").remove();
	clone.find("#namechannel").append($("<p class=text-muted id=now>Maintenant sur "+arr[c]+"</p>"));
	clone.find("#chaine5").attr('id', "chaine"+i+"");
	clone.slideDown(2000);
	
	    
	
    }
}