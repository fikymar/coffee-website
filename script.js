
let beansBag = document.querySelector('.beansBag');
let beansBag_img = document.getElementById('bag');
let clickOnBagBTN = document.getElementById('clickOnBag');
let beans = [];
let bean;
let beanWrapper;


const createBeans = (number) => {
    for (let i = 0; i < number; i++) {

        let randomDepth = Math.random();

        beanWrapper = document.createElement('div');
        bean = document.createElement('img');
        bean.src = `/imgs/bean${Math.ceil(Math.random() * 6)}.png`;
        beanWrapper.appendChild(bean);
        beansBag.appendChild(beanWrapper);
        beans.push(beanWrapper);
        beanWrapper.classList.add('beansBag_bean');
        bean.classList.add('img');
   
        beanWrapper.style.top = `${Math.round(Math.random() * beansBag.offsetHeight)}px`;
        beanWrapper.style.left = `${Math.round(Math.random() * beansBag.offsetWidth)}px`;
        bean.style.transform = `rotate(${(Math.round(Math.random() * 360))}deg)`;
        beanWrapper.dataset.depth = randomDepth;
        beanWrapper.style.width = `${Math.floor(randomDepth * 150) + 50}px`;


        if (window.innerWidth < 1025) {
            beanWrapper.style.width = `${Math.floor(randomDepth * 100) + 20}px`;
        }
    }
}
createBeans(50);



const handleClickOnBeansBag = () => {
    beansBag.classList.toggle('extend');
   
    beans.forEach(item => {
       item.classList.add('hidden');
    });

    if (beansBag.classList.contains('extend')) {
        clickOnBagBTN.style.display = 'none';
        beansBag_img.src = '/imgs/bagEmpty.png';
        beansBag_img.classList.add('emptyBag');
        beansBag_img.style.filter = 'drop-shadow(16px -20px 10px rgba(0, 0, 0, 0.5))';
    } else {
        beansBag_img.src = '/imgs/sack.png';
        beansBag_img.classList.remove('emptyBag');
        beansBag_img.style.filter = 'drop-shadow(16px 16px 10px rgba(0, 0, 0, 0.5))';
    }

    createBeans(300);
    
   
};

const handleResize = () => {
    beans.forEach(item => {
        item.classList.add('hidden');
       
    });
    beansBag.classList.remove('extend');
    createBeans(50);

    input.mouseX.end = window.innerWidth;
    input.mouseY.end = window.innerHeight;
    input.mouseX.range = input.mouseX.end - input.mouseX.start;
    input.mouseY.range = input.mouseY.end - input.mouseY.start;

    input.scrollY.end = document.documentElement.scrollHeight - window.innerHeight;
    input.scrollY.range = input.scrollY.end - input.scrollY.start;
}

[clickOnBagBTN, beansBag, beansBag_img].forEach(function (e) {
    e.addEventListener('click', handleClickOnBeansBag);

});

//parallax

//mouse init
let mouse = {
    x: window.innerWidth,
    y: window.innerHeight,
}

//input
let input = {
    scrollY: {
        start: 0,
        end: document.documentElement.scrollHeight - window.innerHeight,
        current: 0,
      },
    mouseX: {
        start: 0,
        end: window.innerWidth,
        current: mouse.x,
    },
    mouseY: {
        start: 0,
        end: window.innerHeight,
        current: mouse.y,
    },
};
input.scrollY.range = input.scrollY.end - input.scrollY.start;
input.mouseX.range = input.mouseX.end - input.mouseX.start;
input.mouseY.range = input.mouseY.end - input.mouseY.start;

//output
let output = {
    x: {
        start: 0,
        end: 100,
        current: 0,
    },
    y: {
        start: -200,
        end: 100,
        current: 0,
    },
    scrollY: {
        start: -500,
        end: 1000, //higher - bigger movement
        current: 0,
      },
      zIndex: {
        range: 10000,
      },
      scale: {
        start: 2, //original size
        end: 1,
      },
}
output.scale.range = output.scale.end - output.scale.start;
output.x.range = output.x.end - output.x.start;
output.y.range = output.y.end - output.y.start;
output.scrollY.range = output.scrollY.end - output.scrollY.start;

//update
const updateInput = () => {
    input.mouseX.current = mouse.x;
    input.mouseX.fraction = (input.mouseX.current - input.mouseX.start) /
        input.mouseX.range;
    
    input.mouseY.current = mouse.y;
    input.mouseY.fraction = (input.mouseY.current - input.mouseY.start) /
        input.mouseY.range;
    
     //scroll y input
  input.scrollY.current = document.documentElement.scrollTop;
 
   input.scrollY.fraction = (input.scrollY.current - input.scrollY.start) / input.scrollY.range;
  
};

const updateOutput = () => {
    output.x.current = output.x.end - (input.mouseX.fraction * output.x.range);
    output.y.current = output.y.end - (input.mouseY.fraction * output.y.range);

    // output.y.current = output.y.start + (input.scrollY.fraction * output.y.range)
   output.scrollY.current = output.scrollY.start + (input.scrollY.fraction * output.scrollY.range)
};

const updateParallaxItems = () => {
    beans.forEach(function (item, i) {
        
         const depth = parseFloat(item.dataset.depth, 10);
        //console.log(depth)
        
        let itemInput = {
            scrollY: {
              start: -500,
              end: 3000,
            }
          }
          itemInput.scrollY.range = itemInput.scrollY.end - itemInput.scrollY.start;
          itemInput.scrollY.fraction = (input.scrollY.current - itemInput.scrollY.start) / itemInput.scrollY.range;
          
         // var itemOutputYCurrent = output.y.start + (itemInput.scrollY.fraction * output.y.range);
            var itemOutputYCurrent = output.scrollY.start + (itemInput.scrollY.fraction * output.scrollY.range);
          
          var itemOutput = {
            x: output.x.current - (output.x.current * depth),
            y: (itemOutputYCurrent * depth) + (output.y.current - (output.y.current * depth)), //mouse move on y axis
            zIndex: output.zIndex.range - (output.zIndex.range * depth),
            scale: output.scale.start + (output.scale.range * depth),
          
        };

 
        if (beansBag.classList.contains('extend')) {
            item.style.transform = `scale(${itemOutput.scale}) translate(${itemOutput.x}px, ${itemOutput.y}px)`;
            item.style.zIndex = itemOutput.zIndex;
        }

    
     
    });
   
     
  
}

const handleScroll =  () => {
    updateInput();
    updateOutput();
    updateParallaxItems();
   
  }

  
const handleMouseMove = (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  
    updateInput();
    updateOutput();
    updateParallaxItems();
}

window.addEventListener('mousemove', handleMouseMove);
window.addEventListener('resize', handleResize )
document.addEventListener('scroll', handleScroll);