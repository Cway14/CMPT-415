import { SpriteProps } from './@core/Sprite';

const spriteData: { [index: string]: SpriteProps } = {
    ui: {
        src: './assets/ui.png',
        sheet: {
            'self-select': [
                [4, 0],
                [5, 0],
            ],
            select: [[4, 0]],
            dot: [[1, 0]],
            solid: [[0, 1]],
        },
    },
    player: {
        src: './assets/player.png',
        frameWidth: 40,
        frameHeight: 40,
        frameTime: 300,
        sheet: {
            default: [[0, 0]],
            walk: [
                [0, 0],
                [0, 0],
            ],
            action: [
                [0, 0],
                [0, 0],
            ],
        },
    },
    objects: {
        src: './assets/objects.png',
        frameWidth: 20,
        frameHeight: 20,
        sheet: {
            floor: [[0, 0]],
            wall: [[1, 0]],
            'workstation-1': [[0, 1]],
            'workstation-2': [[1, 1]],
            'coffee-machine': [[2, 1]],
            'coffee-machine-empty': [[3, 1]],
            pizza: [[4, 1]],
            plant: [[0, 2]],
        },
    },
    footstep: {
        src: './assets/footstep.png',
        sheet: {
            default: [
                [0, 0],
                [2, 0],
            ],
        },
        opacity: 0.75,
        frameTime: 150,
    },
    map: {
        src: './assets/walls.png',
        frameWidth: 32,
        frameHeight: 32,
        sheet: {
            floor1: [[0, 10]], 
            floor2: [[0, 11]], 
            wall_right: [[0, 14]], 
            wall_left: [[2, 14]], 
            wall_left_top_lower: [[4, 14]], 
            wall_left_top_upper: [[4, 15]], 
            wall_right_top_lower: [[6, 14]], 
            wall_right_top_upper: [[6, 15]], 
            wall_top_lower: [[5, 14]], 
            wall_top_upper: [[5, 15]], 
            wall_left_bottom: [[4, 12]], 
            wall_right_bottom: [[6, 12]],
            wall_bottom: [[5, 12]], 
            door: [[12,6]],
            wall_upper_corner_right: [[0, 13]], 
            wall_upper_corner_left: [[2, 13]], 
            wall_lower_corner_right: [[0, 12]], 
            wall_lower_corner_left: [[2, 12]], 
            left_corner: [[0,15]],
            right_corner: [[2,15]],
            shelfB: [[5, 7]], 
            shelfC: [[4, 5]], 
        }
    },
    items: {
        src: './assets/items.png',
        frameWidth: 32,
        frameHeight: 32,
        sheet: {
            bed_top: [[0, 5]], 
            bed_bot: [[0, 4]], 
            table: [[8,12]],
            up_table: [[12,11]],
        }
    },
    items2: {
        src: './assets/items2.png',
        frameWidth: 32,
        frameHeight: 32,
        sheet: {
            shelf: [[5, 1]], 
            book_bot: [[7, 2]], 
            book_top: [[7, 3]], 
            box: [[8,15]],
            table: [[1,15]],
            chair: [[2, 15]],
            chair2: [[3, 15]],
            chair3: [[4, 15]],
            chair4: [[5, 15]],
            space: [[6,8]],
            barrels1: [[12,13]],
            barrels2: [[13,13]],
            barrels3: [[12,12]],
            barrels4: [[13,12]],
            dtable1: [[4,12]],
            dtable2: [[5,12]],
            cabinet_bot: [[8,6]],
            cabinet_top: [[8,7]],
            small_cabinet: [[0,8]],
            left_table1: [[0,11]],
            left_table2: [[0,12]],
            left_table3: [[0,13]],
            cent_table: [[7,9]],
            table_3: [[4,13]],
            table_4: [[5,13]],
            table_1: [[4,14]],
            table_2: [[5,14]],
        }
    },
    book: {
        src: './assets/magicbook.png',
        frameWidth: 32,
        frameHeight: 32,
        sheet: {
            book: [[0, 0]], 
        }
    },
    lever: {
        src: './assets/levers.png',
        frameWidth: 32,
        frameHeight: 32,
        sheet: {
            lever1: [[0, 0]], 
            lever2: [[1, 0]], 
        }
    },
};

export default spriteData;
