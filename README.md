<h1  align="center">🔊 soundy-js 🔊</small></h1>

  

<div  align="center">

  

**Visualize** and **access** audio data real time with [`React`](https://facebook.github.io/react/)

</div>

  

## Core characteristics
- Access frequency and beat details of any audio in your project
- Blazingly fast feature retreival
- Usable via React hook and React Provider

### Demo
[`Here`](https://ironhamma.github.io/sound_visual_dev/) you can see some visualizaitons done by us.
  

## Get started 🎶
### Installation
Run `npm install soundy-js`

### Usage with React Provider

**Container:**
```JSX
import { SoundyProvider } from  "soundy-js";

function  Container() {
const  playerRef  =  useRef(null);

return (
	<div>
		<audio
			id="audioPlayer"
			src="your_audio.mp3"
			ref={playerRef}>
		</audio>
		<SoundyProvider  playerRef={playerRef}>
			<YourVisualization/>
		</SoundyProvider>
	</div>
);
}
```
 **Visualizer:**

  ```JSX
import  useSoundy  from  'soundy-js';

const  YourVisualization = () => {
const { 
	getLowFrequencyData, 
	getMidFrequencyData, 
	getHighFrequencyData
} =  useSoundy();
return (
	<div>
	... your visualization elements here	
	</div>
);
};
  ```

### Usage with React Hook

 **Visualizer:**

  ```JSX
import useAudioFeatures from 'soundy-js';

const  YourVisualization = () => {
const playerRef = useRef(null);
const { getLowFrequencyData, getMidFrequencyData, getHighFrequencyData } =
    useAudioFeatures(playerRef);
return (
	<div>
		<audio
			id="audioPlayer"
			src="your_audio.mp3"
			ref={playerRef}>
		</audio>
		... your visualization elements here	
	</div>
);
};
  ```

## Currently supported feature set ✅
- Access Low, Mid or High frequency data of your audio
- Retrieve Avarage of Low or Mid frequencies
- Get the peak or the bottom of Low, Mid or High frequencies
- Use the significant beat of the audio as a signal
- Select a custom range of frequency data of your audio
  
  

## Motivation 🤔
We incredibly enjoy making audio visualizers using javascript only. This projects goal is to provide a library that can make this more approachable for others, by supplying the data from the audio via a React hook or Provider. We mostly experimented creating visualizations using Three.js, SVGs and basic HTML elements.
  
  

## Maintainers
[Szabó Benedek](https://github.com/ironhamma)