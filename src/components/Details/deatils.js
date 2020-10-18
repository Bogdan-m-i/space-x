import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Youtube from 'react-youtube';

import useLaunches from '../useLaunches/useLaunches.js';
import Main from '../Main/main.js';
import './details.css';

const Details = (props) => {

	const [launch, setLaunch] = useState(null);

	const { getLaunch } = useLaunches();

	useEffect(() => {
		setLaunch(getLaunch(props.match.params.id));
	}, [getLaunch, props.match.params.id]);

	const history = new useHistory();

	console.log(launch);

	if (!launch) return (<div style={{textAlign:'center'}}>Загрузка</div>);

	return (
		<>
		<Main name={launch.name} />
		<main className="details">
			<div className="container">
				<div className="details-row">
					<div className="details-image">
						<img src={launch.links.patch.small} alt={launch.name} />
					</div>
					<div className="details-content">
						<p className="details-description">{launch.details}</p>
					</div>
				</div>
				<div>
					<Youtube className="details-youtube" videoId={launch.links.youtube_id} />
				</div>
			</div>
			<Link to='/' onClick={history.goBack} className="button button-back">go back</Link>
		</main>
		</>
	)
};

export default Details;