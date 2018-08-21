import React from 'react';
import { observer } from 'mobx-react/native';
import { observable, action } from 'mobx'
import { API_URL } from 'react-native-dotenv'
import { trace } from "mobx"
//mobx.configure({ enforceActions: true })

class ScraperStore {
    @observable ads = []
    @observable state = "none" // "pending" / "done" / "error"

		async fetchAds() {
	    let apiUrl = API_URL + '/scrape';

	    const response = await fetch(apiUrl, {
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				}
			 });

	    return await response.json();
	  }

		async updateAd(data) {
	    let apiUrl = API_URL + '/ad';

	    const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "source": data.Source,
          "description": data.Description
        })
       });

	    return await response;
	  }

    @action
    fetchProjects() {
        this.ads = []
        this.state = "pending"
				this.fetchAds().then(this.fetchAdsSuccess, this.fetchAdsError)
    }

		@action
    deleteAd(data) {
				this.ads = [];
        this.state = "deleting"
        this.updateAd(data).then(this.deleteAdSuccess, this.deleteAdError);
    }

    @action.bound
    fetchAdsSuccess(ads) {
			this.ads = ads;
      debugger
			this.state = "done"
    }

    @action.bound
    fetchAdsError(error) {
        this.state = "error"
    }

		@action.bound
    deleteAdSuccess() {
			this.ads = [];
			this.state = "deleted"
      debugger
			this.fetchProjects();
    }

    @action.bound
    deleteAdError(error) {
        this.state = "error deleting"
    }
}

export default new ScraperStore()
