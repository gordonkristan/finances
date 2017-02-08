import _ from 'lodash';
import React from 'react';

const createRouteComponent = ({ Component, getObservers }) => {
	return class extends React.Component {
		static propTypes = {
			params: React.PropTypes.objectOf(React.PropTypes.string).isRequired
		};

		constructor(props) {
			super(props);

			this.state = {
				observers: {},
				models: null
			};
		}

		componentDidMount() {
			this.setupObservers(this.props.params);
		}

		componentWillReceiveProps(nextProps) {
			this.destroyObservers();
			this.setupObservers(nextProps.params);
		}

		componentWillUnmount() {
			this.destroyObservers();
		}

		////////////////////////////////////////

		setupObservers(params) {
			const observers = getObservers(params);
			const nextState = {
				observers,
				models: _.mapValues(observers, () => undefined)
			};

			this.setState(nextState);

			_.forEach(observers, (observer, name) => {
				observer.onValueUpdated((value) => {
					this.setState({
						models: Object.assign({}, this.state.models, {
							[name]: value
						})
					});
				});
			});
		}

		destroyObservers() {
			_.forEach(this.state.observers, (observer, name) => {
				observer.destroy();
			});
		}

		////////////////////////////////////////

		render() {
			const { models } = this.state;
			if (!models || _.some(models, _.isUndefined)) {
				return null;
			}

			return <Component params={this.props.params} models={this.state.models} />;
		}
	};
};

export { createRouteComponent };