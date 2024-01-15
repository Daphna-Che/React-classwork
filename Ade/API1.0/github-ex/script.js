let url =
  "https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits";
async function getUser() {
  let response = await fetch(url);
  let commits = await response.json();
  console.log(commits);
}
getUser();
