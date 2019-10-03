
function getShortURL()
{
	var ajax = new XMLHttpRequest();
    var token = '7dbaed9e2588ec21bfa6a433695bfe8f';
    var longUrl = document.getElementById("longURL").value;
    var termOfValidity = '1-year';

    ajax.open('post','https://dwz.cn/admin/v2/create', 'true');

    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.setRequestHeader("Token", token);
    
    // 发送请求
    ajax.send(JSON.stringify({
        Url: longUrl,
        TermOfValidity: termOfValidity
    }));

    ajax.onreadystatechange = function () {
        if (ajax.readyState === 4 && ajax.status === 200) {
            // 获取缩短后的网址
			var str = ajax.responseText;
			
			if(str.search('{"Code":0') == 0)
			{
				str = str.replace('{"Code":0,"ShortUrl":"','');
				str = str.replace('{"Code":0,"IsNew":true,"ShortUrl":"','');
				str = str.replace(/".*}/,'');
				//alert("短网址生成成功：" + str);
				document.getElementById("Alert").innerHTML = "短网址生成成功：";
				document.getElementById("shortURL").href = str ;
				document.getElementById("shortURL").innerHTML = str ;
			}
			else
			{
				//alert('暂不支持生成该网址的短网址！');
				document.getElementById("Alert").innerHTML = "暂不支持生成该网址的短网址！";
				document.getElementById("shortURL").href = '' ;
				document.getElementById("shortURL").innerHTML = '' ;
			}
        }
    }
}