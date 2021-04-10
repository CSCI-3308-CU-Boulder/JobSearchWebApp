Javascript functions here

function cancel()
{
	reload();
}

function save_profile()
{
	name = document.getElementById("name");
	major = document.getElementById("major");
	gpa = document.getElementById("gpa");
	uni = document.getElementById("uni");
	experience = document.getElementById("experience");
	skills = document.getElementById("skills");
	username = document.getElementById("username");
	password = document.getElementById("password");
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
