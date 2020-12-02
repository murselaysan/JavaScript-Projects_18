
const imgContainer = document.querySelector(".images");

let currentImg;
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
    const img = document.createElement("img");
    img.src = imgPath;
    currentImg = img;
    imgContainer.append(img);
    img.addEventListener("load", function () {
      resolve(img); // u can send anything to use later in .then
      //resolve(console.log('Image found'));
      //resolve('Image found in resolve');
    });
    img.addEventListener("error", function () {
      reject(new Error("Image not found"));
      //reject('Image not found in reject');
      //reject(console.log('Image not found')); //works but do not use in promise
    });
  }, 2000);
  });
};

const waitFor = function (second) {
  return new Promise(function (resolve) {
    console.log("wait for 2 seconds");
    setTimeout(resolve, second * 1000);
  });
};


const loadNPause = async function () {
  try {
    // Load image 1
    let img = await createImage('images/img-1.jpg');
    console.log('Image 1 loaded');
    await waitFor(2);
    img.style.display = 'none';
    // Load image 1
    newImg = await createImage('images/img-2.jpg');
    console.log('Image 2 loaded');
    await waitFor(2);
    newImg.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};
 loadNPause();

// PART 2

// const loadAll = async function (imgArr) {
//   try {
//     const imgs = imgArr.map(async img => await createImage(img));
//     const imgsEl = await Promise.all(imgs);
//     console.log(imgsEl);
//     imgsEl.forEach(img => img.classList.add('parallel'));
//   } catch (err) {
//     console.error(err);
//   }
// };
//loadAll(['images/img-1.jpg', 'images/img-2.jpg', 'images/img-3.jpg']);

/*
const loadAllProm = async function (imgArr) {
  try {
    const imgsEl = await Promise.all([createImage(imgArr[0]),createImage(imgArr[1]),createImage(imgArr[2])]);
    console.log(imgsEl);

  } catch (err) {
    console.error(err);
  }
};
loadAllProm(['images/img-1.jpg', 'images/img-2.jpg', 'images/img-3.jpg']);
*/