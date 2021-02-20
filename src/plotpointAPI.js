class PlotPointApi {

    constructor(port){
        this.baseURL = `${port}/plot_points`
    }

    getPlotPoints(storyId){
        fetch(this.baseURL)
        .then(resp => resp.json())
        .then(json => {
            json["data"].forEach(element => {
                const p = new PlotPoint({id: element.id, ...element.attributes})
                // let unsortedPP = []
                if(p.story_id === parseInt(storyId)){
                    // unsortedPP.push(p)
                    p.showPlotPoints()
                }
                // sortPlotPoints(unsortedPP)
            })
        })
    }

    createPlotPoint(){
        const plotpointInfo = {
            description: desInput.value,
            story_id: ppStoryInput.value
        }

        const configObj = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(plotpointInfo)
        }

        fetch(this.baseURL, configObj)
        .then(resp => resp.json())
        .then(json => {
            const p = new PlotPoint({id: json.data.id, order: json.data.order, ...json.data.attributes})
            console.log(p)
            if(parseInt(document.querySelector('#storyTitle').dataset.id) === p.story_id){
                p.showPlotPoints()
            }
        })
    }
}