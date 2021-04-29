const randomFileName = () => {
  let alpha = 'qwertyuiopasdfghjklzxcvbnm';
  let string = '';

  for (let i = 0; i < 8; i++) {
    string += alpha[Math.floor(Math.random() * alpha.length)];
  }
  return string;
};

const findLowestQualityVideoUrl = (videos) => {
  let lowestVideoObjects = [];

  for (let i = 0; i < videos.length; i++) {
    let files = videos[i].video_files;

    let lowestQuality = files[0];

    for (let j = 0; j < files.length; j++) {
      if (files[j].height) {
        if (files[j].height < lowestQuality.height) {
          lowestQuality = files[j];
        }
      }
    }
    lowestQuality['title'] = videos[i].url.split('video')[1].split('/')[1] || randomFileName();
    lowestVideoObjects.push(lowestQuality);

  }

  return lowestVideoObjects;
};




const searchMoreVideos = async (url) => {
  // console.log('- - - - - - - - -');
  // console.log('search', url);
  // console.log('- - - - - - - - -');

  await axios.get(url, { headers: { Authorization: `Bearer ${KEY}` } })
    .then((response) => {
      if (response.data.next_page) {
        setTimeout(() => {
          console.log('recurse');
          console.log(response.data.next_page)
          searchMoreVideos(response.data.next_page);
        }, 1000);
      }
      saveToDirectory(response.data.videos);
    })
    .catch((err) => {
      if (err) {

      }
      console.log('searchMore Error');
    });


};


const searchVideos = (addToDb = false) => {

  fs.rmdirSync('./videos', { recursive: true });

  fs.mkdirSync('./videos');

  client.videos.search({ query: 'web development', 'per_page': 80 })
    .then(response => {
      if (response.next_page) {
        setTimeout(() => {
          searchMoreVideos(response.next_page);
        }, 1000);
      }
      // console.log(response);
      let allCourses = countElements(generateAllCourses(100));

      return (addToDb ? addToDB(allCourses) : saveToDirectory(response.videos));
    })
    .then((response) => {
      // console.log(response);
      return;
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
      console.log('Process Complete with Errors');
    });
};