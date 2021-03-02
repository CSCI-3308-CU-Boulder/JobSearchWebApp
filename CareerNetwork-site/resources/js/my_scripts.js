//Javascript functions here

function getFile()
{
      document.getElementById("fileInput").click();
}

function delete_profile()
{
	var result = confirm("Are you sure to delete your profile?");
	if (result)
	{
    		alert("Profile deleted");
		window.location.href = "home.html";
	}
}

/*function update_picture()
{
	var file = document.getElementById("input")
	var pic = document.getElementById("picture")

	var reader = new FileReader();
  	reader.onload = function()
	{
     		pic.src = this.result;
  	}
	reader.readAsDataURL(file);
}*/
