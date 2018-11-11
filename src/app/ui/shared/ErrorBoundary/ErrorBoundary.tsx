import * as React from 'react';

const tRexImg = require('app/assets/trex.png');


export interface IErrorBoundaryProps {
  children: JSX.Element;
  showImage?: boolean;
  text?: string;
}

interface IErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  static defaultProps: Partial<IErrorBoundaryProps> = {
    showImage: true,
  };

  state: IErrorBoundaryState = {hasError: false};


  componentDidCatch(error, info) {
    this.setState({hasError: true});
    console.error({error, info});
  }


  render(): JSX.Element {
    const {showImage, children, text} = this.props;
    const {hasError} = this.state;

    if (hasError) {
      return (
        <div className="text-center">
          {showImage &&
          <div>
            <img src={tRexImg} alt="Something went wrong" />
          </div>}

          {!!text &&
          <div>{text}</div>}
        </div>
      );
    }

    return children;
  }
}
