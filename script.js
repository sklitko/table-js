let Data = [
    {
        name: "Красные носки",
        price: 2,
        count: 2
    },
    {
        name: "Синие носки",
        price: 3,
        count: 3
    },
    {
        name: "Зеленые носки",
        price: 1,
        count: 1
    }
];


class App {
    constructor(data) {
        this.table = document.querySelector('.body');
        this.allSumm = document.querySelector('.allSumm');
        this.data = data;
        this.flag = true;
        this._addEventSort();

    }


    show() {
        this.table.innerHTML = '';
        let allSum = 0;
        for (let i = 0; i < this.data.length; i++) {
            let tds = [document.createElement('td'),
                document.createElement('td'),
                document.createElement('td'),
                document.createElement('td')
            ];
            let inputs = [document.createElement('input'),
                document.createElement('input')];
            let tr = document.createElement('tr');

            tds[0].innerText = this.data[i].name;
            inputs[0].value = this.data[i].price;
            inputs[1].value = this.data[i].count;

            tds[1].appendChild(inputs[0]);
            tds[2].appendChild(inputs[1]);
            tds[3].innerText = this.data[i].price * this.data[i].count;

            for (let a = 0; a < tds.length; a++) {
                tr.appendChild(tds[a]);
            }
            this.table.appendChild(tr);
            this.data[i].summa = this.data[i].price * this.data[i].count;
            allSum += this.data[i].summa;
            this.allSumm.innerText = allSum;
        }

        this._addEvents();
    }


    _addEvents() {
        let inputs = document.querySelectorAll('.body input');
        for (let c = 0; c < inputs.length; c++) {
            inputs[c].addEventListener('input', () => this._checkSumm(), false);
        }
    }

    _addEventSort() {
        this.sort = document.querySelector('.sort');
        this.sort.addEventListener('click', () => this._sort(), false);
    }

    _checkSumm() {
        let trs = document.querySelectorAll('.body tr');
        let allSum = 0;
        for (let b = 0; b < trs.length; b++) {
            let summ = trs[b].children[1].children[0].value * trs[b].children[2].children[0].value;
            this.data[b].price = trs[b].children[1].children[0].value;
            this.data[b].count = trs[b].children[2].children[0].value;
            trs[b].children[3].innerText = summ;
            this.data[b].summa = summ;
            allSum += summ;
        }
        this.allSumm.innerText = allSum;
    }

    _sort() {
        let compareNumeric = (a, b) => a.summa - b.summa;

        let span = document.createElement('span');
        this.sort.childNodes.length > 1 ? this.sort.removeChild(this.sort.childNodes[1]) : "";

        if (this.flag) {
            this.data.sort(compareNumeric);
            this.show();
            this.flag = false;
            let strelka = document.createTextNode(String.fromCharCode(8659));
            span.appendChild(strelka);
            this.sort.appendChild(span);


        } else {
            this.data.sort(compareNumeric);
            this.data.reverse();
            this.show();
            this.flag = true;
            let strelka = document.createTextNode(String.fromCharCode(8657));
            span.appendChild(strelka);
            this.sort.appendChild(span);
        }
    }
}


let table = new App(Data);

table.show();
