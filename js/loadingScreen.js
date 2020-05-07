// Select the node that will be observed for mutations
const targetNode = document.getElementById('game-container');

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
var counter = 0;
const callback = function(mutationsList, observer) {
    console.log(counter++);
    // Use traditional 'for loops' for IE 11
    for (let mutation of mutationsList) {
        console.log(mutation)
        if (mutation.type === 'childList') {
            // console.log('A child node has been added or removed.');
        } else if (mutation.type === 'attributes') {
            // console.log('The ' + mutation.attributeName + ' attribute was modified.');
        }
    }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);

// Later, you can stop observing
// observer.disconnect();