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
        let ppList = document.querySelector('#plot-points')

        let pp = document.createElement('li')
        pp.innerText = this.description
        pp.className = "list-group-item d-flex justify-content-between align-items-center"
        pp.setAttribute('dragable', 'true')
        pp.setAttribute('ondragover', 'dragOver(event)')
        pp.setAttribute('ondragstart', 'dragStart(event)')
        pp.setAttribute('draggable', 'true')
        ppList.append(pp)

        // For order:
        let num = document.createElement('span')
        num.className = "badge badge-primary badge-pill"
        num.innerText = this.order
        pp.append(num)
    }
}