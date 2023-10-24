import React, { Component } from 'react';
import './MainPlayer.css'
class MainPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      up: props.mainPlayer.position.y[0],
      right: props.mainPlayer.position.x[0],
      upPressed: false,
      downPressed: false,
      leftPressed: false,
      rightPressed: false,
      intervalId: null,
    };
  }

  updateBlockPosition = () => {
    const { up, right, upPressed, downPressed, leftPressed, rightPressed } = this.state;
    const step = 8; // Adjust the step size as needed.

    if (upPressed){
      this.setState({ up: up - step })
      this.props.mainPlayer.position.y[1](up)
    };
    if (downPressed){
      this.setState({ up: up + step })
      this.props.mainPlayer.position.y[1](up)
    };
    if (leftPressed){
      this.setState({ right: right - step })
      this.props.mainPlayer.position.x[1](right)
    };
    if (rightPressed){
      this.setState({ right: right + step })
      this.props.mainPlayer.position.x[1](right)
    };
  };

  handleKeyDown = (event) => {
    const { key } = event;

    switch (key) {
      case 'w':
        this.setState({ upPressed: true });
        break;
      case 's':
        this.setState({ downPressed: true });
        break;
      case 'a':
        this.setState({ leftPressed: true });
        break;
      case 'd':
        this.setState({ rightPressed: true });
        break;
      case 'ArrowUp':
        this.setState({ upPressed: true });
        break;
      case 'ArrowDown':
        this.setState({ downPressed: true });
        break;
      case 'ArrowLeft':
        this.setState({ leftPressed: true });
        break;
      case 'ArrowRight':
        this.setState({ rightPressed: true });
        break;
      default:
        break;
    }

    // Check if an interval is already running
    if (!this.state.intervalId) {
      this.setState({
        intervalId: setInterval(this.updateBlockPosition, 50),
      });
    }
  };

  handleKeyUp = (event) => {
    const { key } = event;

    switch (key) {
      case 'w':
        this.setState({ upPressed: false });
        break;
      case 's':
        this.setState({ downPressed: false });
        break;
      case 'a':
        this.setState({ leftPressed: false });
        break;
      case 'd':
        this.setState({ rightPressed: false });
        break;
      case 'ArrowUp':
        this.setState({ upPressed: false });
        break;
      case 'ArrowDown':
        this.setState({ downPressed: false });
        break;
      case 'ArrowLeft':
        this.setState({ leftPressed: false });
        break;
      case 'ArrowRight':
        this.setState({ rightPressed: false });
        break;
      default:
        break;
    }

    // If no arrow keys are pressed, stop the interval
    if (
      !this.state.upPressed &&
      !this.state.downPressed &&
      !this.state.leftPressed &&
      !this.state.rightPressed
    ) {
      clearInterval(this.state.intervalId);
      this.setState({ intervalId: null });
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
  }

  render() {
    const { up, right } = this.state;
    const {mcValue} = this.props;
    this.props.mainPlayer.position.y[1](right)
    this.props.mainPlayer.position.y[1](up)
    function getImage(gender){
      if(gender === 'male') return '/PlayerPicture/boy.png'
      if(gender === 'female') return '/PlayerPicture/girl.png'
      if(gender === 'none') return '/PlayerPicture/non.png'
    }
    return (
      <div
        id="MainPlayerParent"
        style={{
          transform: `translate(${right}px, ${up}px)`,
          width: '50px', // Set your desired width
          height: '50px'
        }}
      >
        <div id={mcValue.username+'OP'}></div>
        <p>{mcValue.username}</p>
        <img id='mcImg' src={getImage(mcValue.gender)} alt="failed to load" />
      </div>
    );
  }
}

export default MainPlayer;