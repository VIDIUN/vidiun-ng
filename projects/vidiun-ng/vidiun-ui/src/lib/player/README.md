# ng2-vidiun-player
## Overview
A component for [Angular 4](hhttps://angular.io/) for embedding the [Vidiun](http://www.vidiun.com) video player.<br/>
The component supports basic embedding as well an API for controlling the player using notifications and events registration.<br/>
Player plugins can be configured as well.

## Usage

#### Attributes
* **width**: The player width. (number)
* **height**: The player height. (number)
* **pid**: Required. Your Vidiun publisher ID. (number)
* **uiconfid**: Required. Your Vidiun player ID. (number)
* **entryid**: Required. The entry ID of the video to play. (string)
* **flahvars**: A Vidiun player flashvars object listing player configuration and plugins.
* **lazy**: When set the true the player doesn't load automatically but waits for a call to the Embed function. (boolean, false by default)
* **id**: (optional) A unique ID for the player object. Should be used when displaying more than one player on page. (string)

#### Events
* **vidiunPlayerReady**: Dispatched by the component when the Vidiun player is ready to play and passes the player reference for API control.

#### Methods
* **Embed()**: Call this method to load a player in which the lazy attribute is set to true.
Useful when you cannot provide all required parameters when the player page loads.
**Note -** Use Angular [ViewChild](https://angular.io/api/core/ViewChild) to get reference to the player component. Use this reference to call the Embed method.


## Examples
<pre>
	&lt;v-player [pid]="playerConfig.pid" [uiconfid]="playerConfig.uiconfid" [entryid]="playerConfig.entryid" [width]="340" [height]="190" (vidiunPlayerReady)="onPlayerReady($event)"&gt;&lt;/v-player&gt;
</pre>