class PlotPoint {
    static all = []

    constructor({id, description, order, story_id}){
        this.id = id
        this.description = description
        this.order = order
        this.story_id = story_id

        PlotPoint.all.push(this)
    }

    showPlotPoints(){
        console.log(this.order)

        let ppList = document.querySelector('#plot-points')

        let pp = document.createElement('li')
        let num = document.createElement('span')

        pp.innerText = this.description
        pp.className = "list-group-item d-flex justify-content-between align-items-center"
        pp.setAttribute('draggable', 'true')
        num.className = "badge badge-primary badge-pill"
        num.innerText = this.order

        ppList.append(pp)
        pp.append(num)
    }
}