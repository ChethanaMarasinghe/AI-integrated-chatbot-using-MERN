import Logo from "./Logo";
import styles from "./Header.module.css";
import NavigationLink from "./NavigationLink";

const Header = () => {
	return (
		<div className={styles.parent}>
			<div>
				<Logo />
			</div>
			<div>
				<NavigationLink to='/' text='Home' />
				<NavigationLink to='/chat' text='Chat' />
			</div>
		</div>
	);
};

export default Header;
