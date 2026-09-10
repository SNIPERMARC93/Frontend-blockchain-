import {Component,type ReactNode} from 'react';
export class AppErrorBoundary extends Component<{children:ReactNode},{error:boolean}> {
  state={error:false};
  static getDerivedStateFromError(){return {error:true};}
  render(){return this.state.error?<main className="error-page empty-state"><h1>This view couldn’t load</h1><p>Reload the page to try again. Your saved demo records are retained.</p><button className="btn btn-default" onClick={()=>window.location.reload()}>Reload page</button><a className="btn btn-outline" href="/login">Go to sign in</a></main>:this.props.children;}
}
