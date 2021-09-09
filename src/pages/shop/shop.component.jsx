import React from 'react';
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';
import { Route } from 'react-router-dom';
// import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
class ShopPage extends React.Component {

    // state = {
    //     isLoading: true
    // }

    // unsubscribeFromSnapshot = null;

    // componentDidMount() {
    //     const { updateCollections } = this.props;
    //     const collectionRef = firestore.collection('collections');
    
        // continuous firebase stream
        // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {           
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //     updateCollections(collectionsMap);
        //     this.setState({ isLoading: false });
        // });

        // another way to do this using promise pattern (loses the continuous stream)

        // collectionRef.get().then(snapshot => {           
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //     updateCollections(collectionsMap);
        //     this.setState({ isLoading: false });
        // });

        // using native fetch API -- items are nested pretty deep
        // fetch('https://firestore.googleapis.com/v1/projects/YOUR_PROJECT_ID_HERE/databases/(default)/documents/collections')
        //      .then(res => res.json())
        //      .then(collections => collections => {           
            //     const collectionsMap = convertCollectionsSnapshotToMap(collections);
            //     updateCollections(collectionsMap);
            //     this.setState({ isLoading: false });
            // })

    // }

    componentDidMount(){
        const { fetchCollectionsStartAsync } = this.props;
        fetchCollectionsStartAsync();
    }

    render(){
        const { match } = this.props;
        // const { isLoading } = this.state;
        return(
            <div className="shop-page">
                <Route exact path={`${match.path}`} component={ CollectionsOverviewContainer } />
                <Route path={`${match.path}/:collectionId`} component={ CollectionPageContainer } />
            </div>
        );

    }
};

const mapDispatchToProps = (dispatch) => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(null, mapDispatchToProps)(ShopPage);