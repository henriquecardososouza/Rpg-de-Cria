const canvas = document.querySelector("canvas");
const contexto = canvas.getContext("2d");

let transOn = 0;
let input_allow = 1;
let alpha = 0;
let telaAtiva = {};
let textoVez = 0;
let drawWizard = 0;
let tiro = 0;
let letter = 0;
let lojaON = 0;
let lojaTurn = 1;
let dano = 0;
let coin = 0;
let tuto = 0;

const shield = {
    spr_shield: new Image(),

    x: 0,
    y: 180,
    spriteX: 0,
    spriteY: 0,
    largura: 160,
    altura: 160,
    largura1: 160,
    altura1: 160,

    desenha() {
        //desenhando o escudo
        this.spr_shield.src = "./sprites/shield.png";

        if (player1.shield > 0) {
            this.atualiza(1, player1.shield)

            contexto.drawImage(
                this.spr_shield, 
                this.spriteX, this.spriteY,
                this.largura, this.altura,
                this.x, this.y,
                this.largura1, this.altura1
            )
        }
        
        if (player2.shield > 0) {
            this.atualiza(2, player2.shield)

            contexto.drawImage(
                this.spr_shield, 
                this.spriteX, this.spriteY,
                this.largura, this.altura,
                this.x, this.y,
                this.largura1, this.altura1
            )
        }
    },

    atualiza(player, durability) {
        //definindo os parâmetros de desenho do escudo
        if (durability == 3) {
            this.spriteX = 0;
        }

        else if (durability == 2) {
            this.spriteX = 160;
        }

        else {
            this.spriteX = 320;
        }

        if (player == 1) {
            this.x = player1.x - 15;
        }

        else {
            this.x = player2.x - 15;
        }
    },
}

const text = {
    x: 392,
    y: 200,
    x1: 392,
    y1: 400,
    string: "Digite o apelido do Player 1:",
    nome1: "",
    nome2: "",
    player: 1,
    confirmacao: 0,
    direcao: 0,

    desenha() {
        //desenhando os textos para a entrada de nomes
        contexto.textAlign = "center";
        contexto.fillStyle = "white";
        contexto.font = "40px 'Merienda One'";
        contexto.fillText(this.string, this.x, this.y);

        if (this.player == 1) {
            contexto.fillText(this.nome1, this.x1, this.y1);
        }

        else {
            contexto.fillText(this.nome2, this.x1, this.y1);
        }
    },

    desenhaConfirmacao() {
        //desenhando a tela de confirmação
        if (this.player == 1) {
            contexto.fillStyle = "white";
            contexto.font = "30px 'Merienda One'";
            contexto.fillText('Player 1 confirma o apelido "' + this.nome1 + '" ?', this.x, this.y);
        }

        else {
            contexto.fillStyle = "white";
            contexto.font = "30px 'Merienda One'";
            contexto.fillText('Player 2 confirma o apelido "' + this.nome2 + '" ?', this.x, this.y);
        }

        contexto.font = "40px 'Merienda One'";

        if (this.direcao == 1) {
            contexto.font = "50px 'Merienda One'";
            contexto.fillRect(this.x1 - 150, this.y1 + 5, 100, 3);
        }

        else {
            contexto.font = "40px 'Merienda One'";
        }

        contexto.fillText("Sim", this.x1 - 100, this.y1);

        if (this.direcao == 2) {
            contexto.font = "50px 'Merienda One'";
            contexto.fillRect(this.x1 + 50, this.y1 + 5, 100, 3);
        }

        else {
            contexto.font = "40px 'Merienda One'";
        }

        contexto.fillText("Nao", this.x1 + 100, this.y1);
        contexto.textAlign = "center";
        contexto.fillStyle = "rgba(255, 255, 255, 0.5)";
        contexto.font = "30px 'Merienda One'";
        contexto.fillText("Use as setas para selecionar itens", canvas.width / 2, canvas.height / 2 + 250);
    },

    atualizaNome(letra) { 
        //adicionando os inputs ao nome do player
        if (telaAtiva == telas.lobby) {
            if (this.player == 1) {
                if (letra == "back") {
                    this.nome1 = this.nome1.substring(0, this.nome1.length - 1);
                }

                else {
                    if ((this.nome1.substring(0, this.nome1.length - 12)) == "") {
                        this.nome1 = this.nome1 + letra;
                    }

                    else {
                        alert("ERROR\nNumero maximo de caracteres excedido!");
                    }
                }
            }

            else {
                if (letra == "back") {
                    this.nome2 = this.nome2.substring(0, this.nome2.length - 1);
                }

                else {
                    if ((this.nome2.substring(0, this.nome2.length - 12)) == "") {
                        this.nome2 = this.nome2 + letra;
                    }

                    else {
                        alert("ERROR\nNumero maximo de caracteres excedido!");
                    }
                }
            }
        }
    },
}

const text_vez = {
    x: 0,
    y: 300,
    string: "",
    counter: 0,
    vez: 1,
    letra: 0,

    desenha() {
        //desenhando uma identificação de que se passou o turno de alguém
        if (this.vez == 1) {
            this.string = "Turno de " + text.nome1;
        }

        else {
            this.string = "Turno de " + text.nome2;
        }

        contexto.fillStyle = "white";
        contexto.textAlign = "center";
        contexto.font = "40px 'Fredericka the Great'";
        contexto.fillText(this.string, this.x, this.y);
    },

    atualiza() {
        //fazendo a animação
        if (this.counter <= 40) {
            this.x += 10;
        }

        else if (this.counter <= 120) {
            this.x += 1;
        }

        else if (this.counter < 170) {
            this.x += 10;
        }

        else {
            sonoplastia.one2 = 1;
            sonoplastia.one3 = 1;
            sonoplastia.one = 1;
            sonoplastia.one1 = 1;
            this.x = 0;
            textoVez = 0;
            this.counter = 0;
            botoes.btn_on = 1;
            input_allow = 1;
            this.letra = 1;
            lojaTurn = 1;

            if (this.vez == 1) {
                if (player1.shield > 0) {
                    player1.shield --;
                }

                if (player1.protect > 0) {
                    player1.protect --;
                }

                if (player1.reforco > 0) {
                    player1.reforco --;
                }

                if (player2.reforco > 0) {
                    player2.reforco --;
                }

                if (player2.protect > 0) {
                    player2.protect --;
                }

                if (player2.shield > 0) {
                    player2.shield --;
                }

                player1.recovery ++;
                player2.recovery ++;
            }
        }

        this.counter ++;
    },
}

const turnoDe = {
    string: "",

    desenha() {
        //desenhando uma identificação de quem é o dono do turno atual
        if (text_vez.vez == 1) {
            this.string = "Turno de " + text.nome1;
        }

        else {
            this.string = "Turno de " + text.nome2;
        }

        contexto.textAlign = "center";
        contexto.fillStyle = "black";
        contexto.font = "30px 'Fredericka the Great'";
        contexto.fillText(this.string, canvas.width / 2, 50);
    },
}

const black_screen = {
    x: 0,
    y: 0,

    desenha() {
        contexto.fillStyle = "rgba(0, 0, 0, 0.5)";
        contexto.fillRect(this.x, this.y, canvas.width, canvas.height);
    }
}

const background_logo = {
    spr_background: new Image(),
    spr_background2: new Image(),

    spriteX: 0,
    spriteY: 0,
    largura: 1008,
    altura: 642,
    x: 0,
    y: 0,

    desenha() {
        //fazendo o desenho da imagem
        this.spr_background.src = "./sprites/background logo.png";
        this.spr_background2.src = "./sprites/background logo 2.png";

        contexto.drawImage(
            this.spr_background,
            this.spriteX, this.spriteY,
            this.largura, this.altura,
            this.x, this.y,
            this.largura, this.altura
        )

        contexto.drawImage(
            this.spr_background2,
            this.spriteX, this.spriteY,
            this.largura, this.altura,
            (this.x + 1008), this.y,
            this.largura, this.altura
        )

        contexto.drawImage(
            this.spr_background,
            this.spriteX, this.spriteY,
            this.largura, this.altura,
            (this.x + 2015), this.y,
            this.largura, this.altura
        )

        this.atualiza();
    },

    atualiza() {
        //fazendo a animação da imagem
        if (this.x > (0 - this.largura * 2)) {
            this.x -= 3;
        }

        else {
            this.x = 0;
        }
    },
}

const plataform = {
    spr_plataform1: new Image(),
    spr_plataform2: new Image(),

    spriteX: 0,
    spriteY: 0,
    largura: 0,
    altura: 0,
    largura1: 0,
    altura1: 0,
    x: 0,
    y: 0,

    atualiza(num) {
        //atualizando os parâmetros de desenho das plataformas
        if (num == 1) {
            this.largura = 411;
            this.altura = 305;
            this.largura1 = this.largura / 2;
            this.altura1 = this.altura / 2;
            this.x = (285 - 150) - 30;
            this.y = (200 + 120) - 55;
        }

        else {
            this.largura = 480;
            this.altura = 218;
            this.altura1 = this.altura / 2;
            this.largura1 = this.largura / 2;
            this.x = 535 - 70;
            this.y = (200 + 120) - 50;
        }
    },

    desenha() {
        //desenhando as plataformas
        this.spr_plataform1.src = "./sprites/chao1.png";
        this.spr_plataform2.src = "./sprites/chao2.png";
        
        this.atualiza(1);

        contexto.drawImage(
            this.spr_plataform1,
            this.spriteX, this.spriteY,
            this.largura, this.altura,
            this.x, this.y,
            this.largura1, this.altura1
        );

        this.atualiza(2);

        contexto.drawImage(
            this.spr_plataform2,
            this.spriteX, this.spriteY,
            this.largura, this.altura,
            this.x, this.y,
            this.largura1, this.altura1
        );

    },
}

const botoes = {
    spr_atacar1: new Image(),
    spr_atacar2: new Image(),
    spr_atacar_selected1: new Image(),
    spr_atacar_selected2: new Image(),
    spr_atacar_frame: new Image(),

    spr_defender1: new Image(),
    spr_defender2: new Image(),
    spr_defender_selected1: new Image(),
    spr_defender_selected2: new Image(),
    spr_defender_frame: new Image(),

    spr_normal1: new Image(),
    spr_normal2: new Image(),
    spr_normal_selected1: new Image(),
    spr_normal_selected2: new Image(),
    spr_normal_frame: new Image(),

    spr_forte_frame: new Image(),

    spriteX: 0,
    spriteY: 0,
    largura: 126,
    altura: 61,
    x: 0,
    y: 460,

    btn_on: 0,
    selecao: 0,
    attack: 0,
    frame: 0,
    frame1: 0,

    desenha() {
        {
            this.spr_atacar1.src = "./sprites/botoes/atacar/atacar 1.png";
            this.spr_atacar2.src = "./sprites/botoes/atacar/atacar 2.png";
            this.spr_atacar_selected1.src = "./sprites/botoes/atacar/select 1.png";
            this.spr_atacar_selected2.src = "./sprites/botoes/atacar/select 2.png";

            this.spr_defender1.src = "./sprites/botoes/defender/defender 1.png";
            this.spr_defender2.src = "./sprites/botoes/defender/defender 2.png";
            this.spr_defender_selected1.src = "./sprites/botoes/defender/select 1.png";
            this.spr_defender_selected2.src = "./sprites/botoes/defender/select 2.png";

            this.spr_normal1.src = "./sprites/botoes/ataque normal/atacar 1.png";
            this.spr_normal2.src = "./sprites/botoes/ataque normal/atacar 2.png";
            this.spr_normal_selected1.src = "./sprites/botoes/ataque normal/select 1.png";
            this.spr_normal_selected2.src = "./sprites/botoes/ataque normal/select 2.png";
        }

        if (this.attack == 0) {
            if (this.selecao != 1) {
                if (this.frame <= 20) {
                    this.spr_atacar_frame.src = this.spr_atacar1.src;
                }

                else if (this.frame <= 40) {
                    this.spr_atacar_frame.src = this.spr_atacar2.src;                    
                }

                else {
                    this.frame = 0;
                }
            }

            else if (this.selecao == 1) {
                if (this.frame <= 10) {
                    this.spr_atacar_frame.src = this.spr_atacar_selected1.src;
                }

                else if (this.frame <= 20) {
                    this.spr_atacar_frame.src = this.spr_atacar_selected2.src;
                }

                else {
                    this.frame = 0;
                }
            }

            if (this.selecao == 2) {
                if (this.frame1 <= 10) {
                    this.spr_defender_frame.src = this.spr_defender_selected1.src;
                }

                else if (this.frame1 <= 20) {
                    this.spr_defender_frame.src = this.spr_defender_selected2.src;
                }

                else {
                    this.frame1 = 0;
                }
            }

            else {
                if (this.frame1 <= 20) {
                    this.spr_defender_frame.src = this.spr_defender1.src;
                }

                else if (this.frame1 <= 40) {
                    this.spr_defender_frame.src = this.spr_defender2.src;
                }

                else {
                    this.frame1 = 0;
                }
            }

            this.frame1 ++;
            this.frame ++;

            this.atualiza(1);

            contexto.drawImage(
                this.spr_atacar_frame,
                this.spriteX, this.spriteY,
                this.largura, this.altura,
                this.x, this.y,
                this.largura, this.altura
            )

            this.atualiza(2);

            contexto.drawImage(
                this.spr_defender_frame,
                this.spriteX, this.spriteY,
                this.largura, this.altura,
                this.x, this.y,
                this.largura, this.altura
            )
        }

        else {
            if (this.selecao == 1) {
                if (this.frame <= 10) {
                    this.spr_normal_frame.src = this.spr_normal_selected1.src;
                }

                else if (this.frame <= 20) {
                    this.spr_normal_frame.src = this.spr_normal_selected2.src;
                }

                else {
                    this.frame = 0;
                }
            }

            else {
                if (this.frame <= 20) {
                    this.spr_normal_frame.src = this.spr_normal1.src;
                }

                else if (this.frame <= 40) {
                    this.spr_normal_frame.src = this.spr_normal2.src;
                }

                else {
                    this.frame = 0;
                }
            }

            if (text_vez.vez == 1) {
                if (this.selecao == 2) {
                    if (player1.recovery == 0) {
                        if (this.frame1 <= 20) {
                            this.spr_forte_frame.src = "./sprites/botoes/ataque forte/vazio 1.png"
                        }

                        else if (this.frame1 <= 40) {
                            this.spr_forte_frame.src = "./sprites/botoes/ataque forte/vazio 2.png"
                        }

                        else {
                            this.frame1 = 0;
                        }
                    }

                    else if (player1.recovery == 1) {
                        if (this.frame1 <= 20) {
                            this.spr_forte_frame.src = "./sprites/botoes/ataque forte/1.4 1.png"
                        }

                        else if (this.frame1 <= 40) {
                            this.spr_forte_frame.src = "./sprites/botoes/ataque forte/1.4 2.png"
                        }

                        else {
                            this.frame1 = 0;
                        }
                    }

                    else if (player1.recovery == 2) {
                        if (this.frame1 <= 20) {
                            this.spr_forte_frame.src = "./sprites/botoes/ataque forte/2.4 1.png"
                        }

                        else if (this.frame1 <= 40) {
                            this.spr_forte_frame.src = "./sprites/botoes/ataque forte/2.4 2.png"
                        }

                        else {
                            this.frame1 = 0;
                        }
                    }

                    else if (player1.recovery == 3) {
                        if (this.frame1 <= 20) {
                            this.spr_forte_frame.src = "./sprites/botoes/ataque forte/3.4 1.png"
                        }

                        else if (this.frame1 <= 40) {
                            this.spr_forte_frame.src = "./sprites/botoes/ataque forte/3.4 2.png"
                        }

                        else {
                            this.frame1 = 0;
                        }
                    }

                    else if (player1.recovery >= 4) {
                        if (this.frame1 <= 10) {
                            this.spr_forte_frame.src = "./sprites/botoes/ataque forte/select 1.png"
                        }

                        else if (this.frame1 <= 20) {
                            this.spr_forte_frame.src = "./sprites/botoes/ataque forte/select 2.png"
                        }

                        else {
                            this.frame1 = 0;
                        }
                    }
                }

                else {
                    if (player1.recovery == 0) {
                        if (this.frame1 <= 20) {
                            this.spr_forte_frame.src = "./sprites/botoes/ataque forte/vazio 1.png"
                        }

                        else if (this.frame1 <= 40) {
                            this.spr_forte_frame.src = "./sprites/botoes/ataque forte/vazio 2.png"
                        }

                        else {
                            this.frame1 = 0;
                        }
                    }

                    else if (player1.recovery == 1) {
                        if (this.frame1 <= 20) {
                            this.spr_forte_frame.src = "./sprites/botoes/ataque forte/1.4 1.png"
                        }

                        else if (this.frame1 <= 40) {
                            this.spr_forte_frame.src = "./sprites/botoes/ataque forte/1.4 2.png"
                        }

                        else {
                            this.frame1 = 0;
                        }
                    }

                    else if (player1.recovery == 2) {
                        if (this.frame1 <= 20) {
                            this.spr_forte_frame.src = "./sprites/botoes/ataque forte/2.4 1.png"
                        }

                        else if (this.frame1 <= 40) {
                            this.spr_forte_frame.src = "./sprites/botoes/ataque forte/2.4 2.png"
                        }

                        else {
                            this.frame1 = 0;
                        }
                    }

                    else if (player1.recovery == 3) {
                        if (this.frame1 <= 20) {
                            this.spr_forte_frame.src = "./sprites/botoes/ataque forte/3.4 1.png"
                        }

                        else if (this.frame1 <= 40) {
                            this.spr_forte_frame.src = "./sprites/botoes/ataque forte/3.4 2.png"
                        }

                        else {
                            this.frame1 = 0;
                        }
                    }

                    else if (player1.recovery >= 4) {
                        if (this.frame1 <= 20) {
                            this.spr_forte_frame.src = "./sprites/botoes/ataque forte/full 1.png";
                        }

                        else if (this.frame1 <= 40) {
                            this.spr_forte_frame.src = "./sprites/botoes/ataque forte/full 2.png";
                        }

                        else {
                            this.frame1 = 0;
                        }
                    }
                }
            }
            
            else {
                if (this.selecao == 2) {
                    if (player2.recovery == 0) {
                        if (this.frame1 <= 20) {
                            this.spr_forte_frame.src = "./sprites/botoes/ataque forte/vazio 1.png"
                        }

                        else if (this.frame1 <= 40) {
                            this.spr_forte_frame.src = "./sprites/botoes/ataque forte/vazio 2.png"
                        }

                        else {
                            this.frame1 = 0;
                        }
                    }

                    else if (player2.recovery == 1) {
                        if (this.frame1 <= 20) {
                            this.spr_forte_frame.src = "./sprites/botoes/ataque forte/1.4 1.png"
                        }

                        else if (this.frame1 <= 40) {
                            this.spr_forte_frame.src = "./sprites/botoes/ataque forte/1.4 2.png"
                        }

                        else {
                            this.frame1 = 0;
                        }
                    }

                    else if (player2.recovery == 2) {
                        if (this.frame1 <= 20) {
                            this.spr_forte_frame.src = "./sprites/botoes/ataque forte/2.4 1.png"
                        }

                        else if (this.frame1 <= 40) {
                            this.spr_forte_frame.src = "./sprites/botoes/ataque forte/2.4 2.png"
                        }

                        else {
                            this.frame1 = 0;
                        }
                    }

                    else if (player2.recovery == 3) {
                        if (this.frame1 <= 20) {
                            this.spr_forte_frame.src = "./sprites/botoes/ataque forte/3.4 1.png"
                        }

                        else if (this.frame1 <= 40) {
                            this.spr_forte_frame.src = "./sprites/botoes/ataque forte/3.4 2.png"
                        }

                        else {
                            this.frame1 = 0;
                        }
                    }

                    else if (player2.recovery >= 4) {
                        if (this.frame1 <= 10) {
                            this.spr_forte_frame.src = "./sprites/botoes/ataque forte/select 1.png"
                        }

                        else if (this.frame1 <= 20) {
                            this.spr_forte_frame.src = "./sprites/botoes/ataque forte/select 2.png"
                        }

                        else {
                            this.frame1 = 0;
                        }
                    }
                }

                else {
                    if (player2.recovery == 0) {
                        if (this.frame1 <= 20) {
                            this.spr_forte_frame.src = "./sprites/botoes/ataque forte/vazio 1.png"
                        }

                        else if (this.frame1 <= 40) {
                            this.spr_forte_frame.src = "./sprites/botoes/ataque forte/vazio 2.png"
                        }

                        else {
                            this.frame1 = 0;
                        }
                    }

                    else if (player2.recovery == 1) {
                        if (this.frame1 <= 20) {
                            this.spr_forte_frame.src = "./sprites/botoes/ataque forte/1.4 1.png"
                        }

                        else if (this.frame1 <= 40) {
                            this.spr_forte_frame.src = "./sprites/botoes/ataque forte/1.4 2.png"
                        }

                        else {
                            this.frame1 = 0;
                        }
                    }

                    else if (player2.recovery == 2) {
                        if (this.frame1 <= 20) {
                            this.spr_forte_frame.src = "./sprites/botoes/ataque forte/2.4 1.png"
                        }

                        else if (this.frame1 <= 40) {
                            this.spr_forte_frame.src = "./sprites/botoes/ataque forte/2.4 2.png"
                        }

                        else {
                            this.frame1 = 0;
                        }
                    }

                    else if (player2.recovery == 3) {
                        if (this.frame1 <= 20) {
                            this.spr_forte_frame.src = "./sprites/botoes/ataque forte/3.4 1.png"
                        }

                        else if (this.frame1 <= 40) {
                            this.spr_forte_frame.src = "./sprites/botoes/ataque forte/3.4 2.png"
                        }

                        else {
                            this.frame1 = 0;
                        }
                    }

                    else if (player2.recovery >= 4) {
                        if (this.frame1 <= 20) {
                            this.spr_forte_frame.src = "./sprites/botoes/ataque forte/full 1.png";
                        }

                        else if (this.frame1 <= 40) {
                            this.spr_forte_frame.src = "./sprites/botoes/ataque forte/full 2.png";
                        }

                        else {
                            this.frame1 = 0;
                        }
                    }
                }
            }

            this.frame ++;
            this.frame1 ++;
            this.atualiza(1);

            contexto.drawImage(
                this.spr_normal_frame,
                this.spriteX, this.spriteY,
                this.largura, this.altura,
                this.x, this.y,
                this.largura, this.altura
            )

            this.atualiza(2);

            contexto.drawImage(
                this.spr_forte_frame,
                this.spriteX, this.spriteY,
                this.largura, this.altura,
                this.x, this.y,
                this.largura, this.altura
            )
        }
    },

    atualiza(num) {
        if (num == 1) {
            this.x = (canvas.width / 2) - 215;
        }

        else {
            this.x = (canvas.width / 2) + 89;
        }
    },
}

const wizard = {
    spr_idle: new Image(),
    spr_attack: new Image(),
    spr_moving: new Image(),
    spr_tiro_esquerda: new Image(),
    spr_tiro_direita: new Image(),

    x: (canvas.width + 80),
    y: -80,
    spriteX: 0,
    spriteY: 0,
    largura: 80,
    altura: 80,

    state: 2,
    zeraX: 0,
    counter: 0,
    frames: 0,
    chegou: 0,
    onde: 0,
    retirar: 0,

    desenha() {
        {
            if (text_vez.vez == 1) {
                this.spr_attack.src = "./sprites/wizard/attack.png";
            }

            else {
                this.spr_attack.src = "./sprites/wizard/attack 2.png";
            }

            this.spr_idle.src = "./sprites/wizard/idle.png";
            this.spr_moving.src = "./sprites/wizard/moving.png";
            this.spr_tiro_direita.src = "./sprites/wizard/tiro direita.png";
            this.spr_tiro_esquerda.src = "./sprites/wizard/tiro esquerda.png";
        }

        if (this.state != 0) {
            if (this.zeraX == 1) {
                this.spriteX = 0;
                this.zeraX = 0;
            }
        }

        if (this.state == 0) {
            contexto.drawImage(
                this.spr_idle,
                this.spriteX, this.spriteY,
                this.largura, this.altura,
                this.x, this.y,
                this.largura, this.altura
            )

            this.counter ++;

            if (this.frames < 9) {
                if (this.counter == 18) {
                    if (this.spriteX < 160) {
                        this.spriteX += 80;
                    }

                    else {
                        this.spriteX = 0
                    }

                    this.counter = 0;
                    this.frames ++;
                }
            }

            else if (this.frames == 9) {
                if (text_vez.vez == 1) {
                    this.spriteX = 80;
                }

                else {
                    this.spriteX = 0;
                }

                if (this.counter >= 54) {
                    this.state = 1;
                    this.counter = 0;
                    this.frames = 0;
                }

            }

            this.zeraX = 1;
        }

        else if (this.state == 1) {
            contexto.drawImage(
                this.spr_attack,
                this.spriteX, this.spriteY,
                this.largura, this.altura,
                this.x, this.y,
                this.largura, this.altura
            )

            this.counter ++;

            if (this.counter == 9) {
                if (this.spriteY == 0) {
                    if (this.spriteX < 480) {
                        this.spriteX += 80;
                    }

                    else {
                        this.spriteX = 0;
                        this.spriteY = 80;
                    }
                }

                else {
                    if (this.spriteX < 80) {
                        this.spriteX += 80;
                    }

                    else {
                        this.spriteX = 0;
                        this.spriteY = 0;
                    }
                }
                
                this.counter = 0;
                this.frames ++;

                if (this.frames == 6) {
                    tiro = 1;
                }

                else if (this.frames == 9) {
                    this.frames = 0;
                    this.state = 2;
                    this.spriteX = 0;
                    this.spriteY = 0;
                    this.retirar = 1;
                }
            }
        }

        else if (this.state == 2) {
            contexto.drawImage(
                this.spr_moving,
                this.spriteX, this.spriteY,
                this.largura, this.altura,
                this.x, this.y,
                this.largura, this.altura
            )

            this.counter ++;

            if (this.counter == 9) {
                if (this.chegou == 0) {
                    if (this.spriteX < 400) {
                        this.spriteX += 80;
                    }
                    else {
                        this.spriteX = 240;
                    }
                }

                else {
                    this.spriteX = 0;
                    this.state = 0;
                    this.chegou = 0;
                }

                this.counter = 0;
            }
        }
    },

    atualiza() {
        if (this.onde == 0) {
            if (this.x + (this.largura / 2) >= (canvas.width / 2)) {
                this.x -= 5;
                this.y += 1;
            }

            else {
                this.chegou = 1;
                this.onde = 1;
            }
        }

        else if (this.retirar == 1) {
            if (this.x > 0 || this.y > 0) {
                this.x -= 5;
                this.y -= 1;
            }

            else {
                this.onde = 0;
                this.chegou = 0;
                this.retirar = 0;
                this.x = (canvas.width + 80);
                this.y = -80;
                drawWizard = 0;
                if (text_vez.vez == 1) {
                    text_vez.vez = 2;
                }

                else {
                    text_vez.vez = 1;
                }
                
                textoVez = 1;

            }
        }
    },
}

const mago_tiro = {
    spr_esquerda: new Image(),
    spr_direita: new Image(),

    spriteX: 0,
    spriteY: 0,
    largura: 16,
    altura: 16,
    x: 350,
    y: 23,

    desenha() {
        this.spr_esquerda.src = "./sprites/wizard/tiro esquerda.png";
        this.spr_direita.src = "./sprites/wizard/tiro direita.png";

        if (text_vez.vez == 2) {
            contexto.drawImage(
                this.spr_direita,
                this.spriteX, this.spriteY,
                this.largura, this.altura,
                this.x + 51, this.y + 43,
                this.largura, this.altura 
            )

            this.atualiza(2);
        }

        else {
            contexto.drawImage(
                this.spr_esquerda,
                this.spriteX, this.spriteY,
                this.largura, this.altura,
                this.x + 12, this.y + 43,
                this.largura, this.altura 
            )

            this.atualiza(1);
        }  
    },

    atualiza(num) {
        if (num == 1) {
            if (this.x > (player1.x + player1.largura) || this.y + this.altura < player1.y) {
                this.x -= 4;
                this.y += 4;
            }

            else {
                if (player1.protect == 0) {
                    this.effect(Math.floor(Math.random() * 11));
                    player1.state = 4;
                }

                else {
                    alert("Nada aconteceu!");
                }
                
                tiro = 0;
                this.x = 350;
                this.y = 23;
                
            }
        }

        else {
            if ((this.x + this.largura) < player2.x || (this.y + this.altura) < player2.y) {
                this.x += 4;
                this.y += 4;
            }

            else {
                if (player2.protect == 0) {
                    this.effect(Math.floor(Math.random() * 11));
                    player2.state = 4;
                }

                else {
                    alert("Nada aconteceu!");
                }
                
                tiro = 0;
                this.x = 350;
                this.y = 23;
            }
        }
    },

    effect(num) {
        if (num <= 3) {
            if (text_vez.vez == 1) {
                if (player1.shield > 0) {
                    player1.shield = 0;
                    alert(text.nome1 + " perdeu seu escudo!");
                }

                else {
                    player1.shield = 3;
                    alert(text.nome1 + " ganhou escudo!");
                }
            }

            else {
                if (player2.shield > 0) {
                    player2.shield = 0;
                    alert(text.nome2 + " perdeu seu escudo!");
                }

                else {
                    player2.shield = 3;
                    alert(text.nome2 + " ganhou escudo!");
                }
            }
        }

        else if (num <= 6) {
            if (text_vez.vez == 1) {
                player1.vida -= 15;
                alert(text.nome1 + " perdeu 15 pontos de vida!");
            }

            else {
                player2.vida -=15;
                alert(text.nome2 + " perdeu 15 pontos de vida!");
            }
        }

        else if (num <= 9) {
            if (text_vez.vez == 1) {
                if (player1.vida < 40) {
                    player1.vida += 10;
                }

                else {
                    player1.vida = 50;
                }

                alert(text.nome1 + " ganhou 10 pontos de vida!");
            }

            else {
                if (player2.vida > 40) {
                    player2.vida = 50;
                }

                else {
                    player2.vida += 10;
                }

                alert(text.nome2 + " ganhou 10 pontos de vida!");
            }
        }

        else {
            if (text_vez.vez == 1) {
                if (player1.recovery >= 4) {
                    player1.recovery = 0;
                    alert(text.nome1 + " teve seu ataque forte descarregado!");
                }

                else {
                    player1.recovery = 4;
                    alert(text.nome1 + " teve seu ataque forte recarregado!");
                }
            }

            else {
                if (player2.recovery >= 4) {
                    player2.recovery = 0;
                    alert(text.nome2 + " teve seu ataque forte descarregado!");
                }

                else {
                    player2.recovery = 4;
                    alert(text.nome2 + " teve seu ataque forte recarregado!");
                }
            }
        }
    }
}

const player1 = {
    spr_player_idle: new Image(),
    spr_player_attack: new Image(),
    spr_player_attack2: new Image(),
    spr_player_hurt: new Image(),
    spr_player_die: new Image(),
    spr_player_active_shield: new Image(),

    spriteX: 0,
    spriteY: 0,
    largura: 133,
    altura: 120,
    largura1: 133,
    altura1: 120,
    x: 135,
    y: 200,
    state: 0,
    counter: 0,
    vezes: 0,
    zeraX: 0,

    vida: 50,
    shield: 0,
    ataque1: 10,
    ataque2: 15,
    recovery: 4,
    coins: 0,
    protect: 0,
    revive: 0,
    reforco: 0,

    atualiza() {
        this.spr_player_idle.src = "./sprites/player 1/idle.png";
        this.spr_player_attack.src = "./sprites/player 1/attack.png";
        this.spr_player_attack2.src = "./sprites/player 1/attack 2.png";
        this.spr_player_die.src = "./sprites/player 1/die.png";
        this.spr_player_hurt.src = "./sprites/player 1/hurt.png";
        this.spr_player_active_shield.src = "./sprites/player 1/active shield.png";

        if (this.reforco == 0) {
            this.ataque1 = 10;
            this.ataque2 = 15;
        }
    },

    desenha() {
        if (this.state != 0){
            if (this.zeraX == 1) {
               this.spriteX = 0;
               this.zeraX = 0; 
            } 
        }

        if (this.state == 0) {
            contexto.drawImage(
                this.spr_player_idle,
                this.spriteX, this.spriteY,
                this.largura, this.altura,
                this.x, this.y,
                this.largura1, this.altura1,
            );

            this.counter += 1;

            if (this.counter == 9) {
                if (this.spriteX < 399) {
                    this.spriteX += 133;
                }
                else {
                    this.spriteX = 0;
                }
                this.counter = 0;
            }
            this.zeraX = 1;
        }

        else if (this.state == 1) {
            this.largura = 133;
            this.largura1 = this.largura;
            this.altura = 120;
            this.altura1 = this.altura;

            contexto.drawImage(
                this.spr_player_attack,
                this.spriteX, this.spriteY,
                this.largura, this.altura,
                this.x, this.y,
                this.largura1, this.altura1,
            );
    
            this.counter += 1;

            if (this.counter == 9) {
                if (this.spriteX < 798) {
                    this.spriteX += 133;
                }

                else {
                    this.spriteX = 0;
                }

                this.counter = 0;
                this.vezes += 1;

                if (this.vezes == 8) {
                    this.state = 0;
                    this.vezes = 0;

                    if (player2.shield == 0) {
                        player2.vida -= this.ataque1;
                        player2.state = 4;
                        dano = 1;
                        mostra_dano.quem = 2;
                        mostra_dano.qual = 1;
                    }

                    else {
                        player2.shield --;
                        botoes.btn_on = 0;

                        if (drawWizard == 0) {
                            textoVez = 1;
                        }
                    }
                    
                }
            }
        }   

        else if (this.state == 2) {
            if (this.recovery < 4) {
                alert("ERROR\nAtaque forte recarregando,\nsera executado um ataque normal!");
                this.state = 1;
            }

            else {
                this.largura = 150;
                this.altura = 120;
                this.largura1 = this.largura;
                this.altura1 = this.altura;

                contexto.drawImage(
                    this.spr_player_attack2,
                    this.spriteX, this.spriteY,
                    this.largura, this.altura,
                    this.x, this.y,
                    this.largura1, this.altura1
                )

                this.counter ++;

                if (this.counter == 9) {
                    if (this.spriteX < 750) {
                        this.spriteX += 150;
                    }

                    else {
                        this.spriteX = 0;
                    }

                    this.counter = 0;
                    this.vezes ++;

                    if (this.vezes == 6) {
                        this.spriteX = 0;
                        this.state = 0;
                        this.vezes = 0;

                        this.largura = 133;
                        this.altura = 120;
                        this.largura1 = this.largura;
                        this.altura1 = this.altura;
                        this.recovery = 0;

                        if (player2.shield == 0) {
                            player2.vida -= this.ataque2;
                            player2.state = 4;
                            dano = 1;
                            mostra_dano.quem = 2;
                            mostra_dano.qual = 2;
                        }

                        else {
                            player2.shield --;
                            botoes.btn_on = 0;

                            if (drawWizard == 0) {
                                textoVez = 1;
                            }
                        }
                    }
                }
            }
        }

        else if (this.state == 3) {
            this.largura = 150;
            this.altura = 111;
            this.largura1 = this.largura;
            this.altura1 = this.altura;

            contexto.drawImage(
                this.spr_player_active_shield,
                this.spriteX, this.spriteY,
                this.largura, this.altura,
                this.x, this.y, 
                this.largura1, this.altura1
            )

            this.counter ++;

            if (this.counter == 9) {
                if (this.spriteX < 300) {
                    this.spriteX += 150;
                    this.counter = 0;
                }

                else {
                    this.spriteX = 0;
                    this.state = 0;
                    this.counter = 0;
                    this.shield = 3;
                    
                    this.largura = 133;
                    this.altura = 120;
                    this.largura1 = this.largura;
                    this.altura1 = this.altura1;
                    botoes.btn_on = 0;

                    if (drawWizard == 0) {
                        textoVez = 1;
                    }
                }
            }

        }

        else if (this.state == 4) {
            this.largura = 150;
            this.altura = 111;

            contexto.drawImage(
                this.spr_player_hurt,
                this.spriteX, this.spriteY,
                this.largura, this.altura,
                this.x, this.y,
                this.largura, this.altura
            )

            this.counter ++;

            if (this.counter == 9) {
                if (this.spriteX < 300) {
                    this.spriteX += 150;
                    this.counter = 0;
                }

                else {
                    this.spriteX = 0;
                    this.counter = 0;
                    this.largura = 133;
                    this.altura = 120;
                    this.state = 0;

                    if (drawWizard == 0) {
                        textoVez = 1;
                    }

                    botoes.btn_on = 0;
                }
            }
        }

        else if (this.state == 5) {
            this.largura = 150;
            this.altura = 111;

            contexto.drawImage(
                this.spr_player_die,
                this.spriteX, this.spriteY,
                this.largura, this.altura,
                this.x, this.y,
                this.largura, this.altura
            )

            this.counter ++;

            if (this.counter == 9) {
                if (this.spriteX < 900) {
                    this.spriteX += 150;
                    this.counter = 0;
                }

                else {
                    this.counter = 0;
                    this.spriteX = 600;
                }
            }
        }
    }
}

const player2 = {
    spr_player_idle: new Image(),
    spr_player_attack: new Image(),
    spr_player_attack2: new Image(),
    spr_player_hurt: new Image(),
    spr_player_die: new Image(),
    spr_player_active_shield: new Image(),

    spriteX: 0,
    spriteY: 0,
    largura: 133,
    altura: 120,
    largura1: 133,
    altura1: 120,
    x: (canvas.width - 250),
    y: 200,
    state: 0,
    counter: 0,
    vezes: 0,
    zeraX: 0,

    recovery: 4,
    vida: 50,
    shield: 0,
    ataque1: 10,
    ataque2: 15,
    coins: 0,
    protect: 0,
    revive: 0,
    reforco: 0,

    atualiza() {
        this.spr_player_idle.src = "./sprites/player 2/idle.png";
        this.spr_player_attack.src = "./sprites/player 2/attack.png";
        this.spr_player_attack2.src = "./sprites/player 2/attack 2.png";
        this.spr_player_die.src = "./sprites/player 2/die.png";
        this.spr_player_hurt.src = "./sprites/player 2/hurt.png";
        this.spr_player_active_shield.src = "./sprites/player 2/active shield.png";

        if (this.reforco == 0) {
            this.ataque1 = 10;
            this.ataque2 = 15;
        }
    },

    desenha() {
        if (this.state != 0){
            if (this.zeraX == 1) {
               this.spriteX = 0;
               this.zeraX = 0; 
            } 
        }

        if (this.state == 0) {
            contexto.drawImage(
                this.spr_player_idle,
                this.spriteX, this.spriteY,
                this.largura, this.altura,
                this.x, this.y,
                this.largura1, this.altura1,
            );

            this.counter += 1;

            if (this.counter == 9) {
                if (this.spriteX < 399) {
                    this.spriteX += 133;
                }
                else {
                    this.spriteX = 0;
                }
                this.counter = 0;
            }
            this.zeraX = 1;
        }

        else if (this.state == 1) {
            this.largura = 133;
            this.largura1 = this.largura;
            this.altura = 120;
            this.altura1 = this.altura;

            contexto.drawImage(
                this.spr_player_attack,
                this.spriteX, this.spriteY,
                this.largura, this.altura,
                this.x, this.y,
                this.largura1, this.altura1,
            );
    
            this.counter += 1;

            if (this.counter == 9) {
                if (this.spriteX < 798) {
                    this.spriteX += 133;
                }

                else {
                    this.spriteX = 0;
                }

                this.counter = 0;
                this.vezes += 1;

                if (this.vezes == 8) {
                    this.state = 0;
                    this.vezes = 0;

                    if (player1.shield == 0) {
                        player1.vida -= this.ataque1;
                        player1.state = 4;
                        dano = 1;
                        mostra_dano.quem = 1;
                        mostra_dano.qual = 1;
                    }

                    else {
                        player1.shield --;
                        botoes.btn_on = 0;

                        if (drawWizard == 0) {
                            textoVez = 1;
                        }
                    }  
                }
            }
        }   

        else if (this.state == 2) {
            if (this.recovery < 4) {
                alert("ERROR\nAtaque forte recarregando,\nsera executado um ataque normal!");
                this.state = 1;
            }

            else {
                this.largura = 150;
                this.altura = 120;
                this.largura1 = this.largura;
                this.altura1 = this.altura;

                contexto.drawImage(
                    this.spr_player_attack2,
                    this.spriteX, this.spriteY,
                    this.largura, this.altura,
                    this.x, this.y,
                    this.largura1, this.altura1
                )

                this.counter ++;

                if (this.counter == 9) {
                    if (this.spriteX < 750) {
                        this.spriteX += 150;
                    }

                    else {
                        this.spriteX = 0;
                    }

                    this.counter = 0;
                    this.vezes ++;

                    if (this.vezes == 6) {
                        this.spriteX = 0;
                        this.state = 0;
                        this.vezes = 0;

                        this.largura = 133;
                        this.altura = 120;
                        this.largura1 = this.largura;
                        this.altura1 = this.altura;
                        this.recovery = 0;

                        if (player1.shield == 0) {
                            player1.vida -= this.ataque2;
                            player1.state = 4;
                            dano = 1;
                            mostra_dano.quem = 1;
                            mostra_dano.qual = 2;
                        }

                        else {
                            player1.shield --;
                            botoes.btn_on = 0;

                            if (drawWizard == 0) {
                                textoVez = 1;
                            }
                        } 
                    }
                }
            }
        }

        else if (this.state == 3) {
            this.largura = 150;
            this.altura = 111;
            this.largura1 = this.largura;
            this.altura1 = this.altura;

            contexto.drawImage(
                this.spr_player_active_shield,
                this.spriteX, this.spriteY,
                this.largura, this.altura,
                this.x, this.y, 
                this.largura1, this.altura1
            )

            this.counter ++;

            if (this.counter == 9) {
                if (this.spriteX < 300) {
                    this.spriteX += 150;
                    this.counter = 0;
                }

                else {
                    this.spriteX = 0;
                    this.state = 0;
                    this.counter = 0;
                    this.shield = 3;
                    
                    this.largura = 133;
                    this.altura = 120;
                    this.largura1 = this.largura;
                    this.altura1 = this.altura1;

                    if (drawWizard == 0) {
                        textoVez = 1;
                    }
                    botoes.btn_on = 0;
                }
            }

        }

        else if (this.state == 4) {
            this.largura = 150;
            this.altura = 111;

            contexto.drawImage(
                this.spr_player_hurt,
                this.spriteX, this.spriteY,
                this.largura, this.altura,
                this.x, this.y,
                this.largura, this.altura
            )

            this.counter ++;

            if (this.counter == 9) {
                if (this.spriteX < 300) {
                    this.spriteX += 150;
                    this.counter = 0;
                }

                else {
                    this.spriteX = 0;
                    this.counter = 0;
                    this.largura = 133;
                    this.altura = 120;
                    this.state = 0;
                    if (drawWizard == 0) {
                        textoVez = 1;
                    }

                    botoes.btn_on = 0;
                }
            }
        }

        else if (this.state == 5) {
            this.largura = 150;
            this.altura = 111;

            contexto.drawImage(
                this.spr_player_die,
                this.spriteX, this.spriteY,
                this.largura, this.altura,
                this.x, this.y,
                this.largura, this.altura
            )

            this.counter ++;

            if (this.counter == 9) {
                if (this.spriteX < 900) {
                    this.spriteX += 150;
                    this.counter = 0;
                }

                else {
                    this.counter = 0;
                    this.spriteX = 600;
                }
            }
        }
    }
}

const mostra_dano = {
    x: 0,
    y: (player1.y + 50),
    string: "",
    quem: 0,
    qual: 0,
    counter: 0,
    alpha: 1,

    desenha() {
        this.atualiza();

        contexto.textAlign = "center";
        contexto.font = "20px 'Orelega One'";
        contexto.fillText(this.string, this.x, this.y);
    },

    atualiza() {
        if (this.quem == 1) {
            this.x = player1.x + player1.largura / 2;

            if (this.qual == 1) {
                this.string = "- " + player2.ataque1;
            }

            else {
                this.string = "- " + player2.ataque2;
            }
        }

        else {
            this.x = player2.x + player2.largura / 2;

            if (this.qual == 1) {
                this.string = "- " + player1.ataque1;
            }

            else {
                this.string = "- " + player1.ataque2;
            }
        }

        this.counter ++;
        this.y -= 0.5;
        contexto.fillStyle = "rgba(255, 0, 0, " + this.alpha + ")";
        this.alpha -= 0.01;

        if (this.counter == 100) {
            dano = 0;
            this.counter = 0;
            this.y = (player1.y + 50);
            this.alpha = 1;
        }
    },
}

const ganha_moeda = {
    x: 0,
    y: (player1.y + 20),
    x1: 0,
    largura: 18,
    altura: 18,
    counter: -1,
    alpha: 1,

    spr: {
        spr: new Image(),
        spr0: new Image(),
        spr1: new Image(),
        spr2: new Image(),
        spr3: new Image(),
        spr4: new Image(),
        spr5: new Image(),
        spr6: new Image(),
        spr7: new Image(),
        spr8: new Image(),
        spr9: new Image(),
    },

    desenha() {
        this.atualiza(1);

        contexto.drawImage(
            this.spr.spr,
            0, 0,
            this.largura, this.altura,
            this.x, this.y - 15,
            this.largura, this.altura
        )

        this.atualiza(2);

        contexto.textAlign = "left";
        contexto.font = "20px 'Orelega One'";

        contexto.fillText("+ 5", this.x1, this.y);
    },

    atualiza(opcao) {
        {
            this.spr.spr0.src = "./sprites/coin/spr0.png";
            this.spr.spr1.src = "./sprites/coin/spr1.png";
            this.spr.spr2.src = "./sprites/coin/spr2.png";
            this.spr.spr3.src = "./sprites/coin/spr3.png";
            this.spr.spr4.src = "./sprites/coin/spr4.png";
            this.spr.spr5.src = "./sprites/coin/spr5.png";
            this.spr.spr6.src = "./sprites/coin/spr6.png";
            this.spr.spr7.src = "./sprites/coin/spr7.png";
            this.spr.spr8.src = "./sprites/coin/spr8.png";
            this.spr.spr9.src = "./sprites/coin/spr9.png";
        }

        if (text_vez.vez == 1) {
            this.x1 = player1.x + 100;
            this.x = player1.x + 130;
        }

        else {
            this.x1 = player2.x;
            this.x = player2.x + 30;
        }

        if (opcao == 1) {
            this.counter ++;

            if (this.counter <= 10) {
                this.spr.spr.src = this.spr.spr0.src;
            }
            
            else if (this.counter <= 20) {
                this.spr.spr.src = this.spr.spr1.src;
            }

            else if (this.counter <= 30) {
                this.spr.spr.src = this.spr.spr2.src;
            }

            else if (this.counter <= 40) {
                this.spr.spr.src = this.spr.spr3.src;
            }

            else if (this.counter <= 50) {
                this.spr.spr.src = this.spr.spr4.src;
            }

            else if (this.counter <= 60) {
                this.spr.spr.src = this.spr.spr5.src;
            }

            else if (this.counter <= 70) {
                this.spr.spr.src = this.spr.spr6.src;
            }

            else if (this.counter <= 80) {
                this.spr.spr.src = this.spr.spr7.src;
            }

            else if (this.counter <= 90) {
                this.spr.spr.src = this.spr.spr8.src;
            }

            else if (this.counter < 100) {
                this.spr.spr.src = this.spr.spr9.src;
            }

            else {
                this.alpha = 1;
                this.counter = 0;
                coin = 0;
            }
        }

        else {
            contexto.fillStyle = "rgba(0, 0, 0, " + this.alpha + ")";
            if (this.alpha > 0) {
                this.alpha -= 0.01;
            }
        }
    }
}

const life_bar = {
    spr_life_bar: new Image(),

    spriteX: 0,
    spriteY: 0,
    largura: 104,
    altura: 14,
    x: 0,
    y: (player1.y - 10),

    desenha() {
        this.atualiza();
        contexto.drawImage(
            this.spr_life_bar,
            this.spriteX, this.spriteY,
            this.largura, this.altura,
            this.x, this.y,
            this.largura, this.altura
        )
    },

    atualiza() {
        this.spr_life_bar.src = "./sprites/life bar/" + player1.vida + ".png";
        this.x = player1.x + 15;
    }
}

const life_bar2 = {
    spr_life_bar: new Image(),

    spriteX: 0,
    spriteY: 0,
    largura: 104,
    altura: 14,
    x: 0,
    y: (player1.y - 10),

    desenha() {
        this.atualiza();
        contexto.drawImage(
            this.spr_life_bar,
            this.spriteX, this.spriteY,
            this.largura, this.altura,
            this.x, this.y,
            this.largura, this.altura
        )
    },

    atualiza() {
        this.spr_life_bar.src = "./sprites/life bar/" + player2.vida + ".png";
        this.x = player2.x + 15;
    }
}

const Background_jogo = {
    backImage1: new Image(),
    backImage2: new Image(),

    x: 0,
    y: 0,

    desenha() {
        this.backImage2.src = "./sprites/background/sky down.jpg";
        this.backImage1.src = "./sprites/background/sky up.jpg";

        contexto.drawImage(
            this.backImage1,
            this.x,
            this.y,
        );
        contexto.drawImage(
            this.backImage2,
            this.x,
            this.y + 442,
        );
        contexto.drawImage(
            this.backImage1,
            this.x,
            this.y + 884,
        );
        contexto.drawImage(
            this.backImage2,
            this.x,
            this.y + 1326,
        );

        this.y -= 12;

        if (this.y <= -884) {
            this.y = 0;
        }
    }
}

const titulo = {
    desenha() {
        contexto.fillStyle = "rgba(0, 0, 0, 0.5)";
        contexto.fillRect(((canvas.width / 2) - 220), ((canvas.height / 2) - 70), 450, 96);

        contexto.fillStyle = "rgba(255, 255, 255, 0.5)";
        contexto.fillRect(((canvas.width / 2) - 220), ((canvas.height / 2) - 75), 450, 5);
        contexto.fillRect(((canvas.width / 2) - 220), ((canvas.height / 2) - 75 + 101), 450, 5);
        contexto.fillRect(((canvas.width / 2) - 225), ((canvas.height / 2) - 75), 5, 106);
        contexto.fillRect(((canvas.width / 2) - 220 + 450), ((canvas.height / 2) - 75), 5, 106);

        contexto.font = "75px 'Carter One'";
        contexto.textAlign = "center";
        contexto.fillStyle = "rgb(160, 210, 210)";
        contexto.fillText("Rpg de Cria", canvas.width / 2, canvas.height / 2);

        contexto.font = "25px 'Orelega One'";
        contexto.fillStyle = "white";
        contexto.textAlign = "right";
        contexto.fillText('Pressione "Enter" para comecar', canvas.width - 20, canvas.height - 20);
    }
}

const black_screen2 = {
    desenha() {
        contexto.fillStyle = "rgb(0, 0, 0)";
        contexto.fillRect(0, 0, canvas.width, canvas.height);
    }
}

const morreu = {
    morre: 0,

    atualiza() {
        if (this.morre == 0) {
            if (this.revive(1) || this.revive(2)) {
                mudaTela(telas.final);
                this.morre = 1;
            }
        }
    },
    
    revive(num) {
        if (num == 1) {
            if (player1.revive == 1) {
                if (player1.vida <= 0) {
                    player1.vida = 50;
                    player1.revive = 0;
                }

                return false;
            }

            else {
                if (player1.vida <= 0) {
                    return true;
                }

                else {
                    return false;
                }
            }
        }

        else {
            if (player2.revive == 1) {
                if (player2.vida <= 0) {
                    player2.vida = 50;
                    player2.revive = 0;
                }

                return false;
            }

            else {
                if (player2.vida <= 0) {
                    return true;
                }

                else {
                    return false;
                }
            }
        }
    },
}

const end_game = {
    atualiza() {
        if (player1.vida > player2.vida) {
            player2.state = 5;
            who_win.who = 1;
        }

        else if (player2.vida > player1.vida) {
            player1.state = 5;
            who_win.who = 2;
        }

        else {
            who_win.who = 0;
        }
    }
}

const who_win = {
    who: 0,

    desenha() {
        contexto.fillStyle = "white";
        contexto.font = "50px 'Fredericka the Great'";
        contexto.textAlign = "center";

        if (this.who == 1) {
            contexto.fillText(text.nome1 + " venceu!", canvas.width / 2, 450);
        }

        else if (this.who == 2) {
            contexto.fillText(text.nome2 + " venceu!", canvas.width / 2, 450);
        }

        else {
            contexto.fillText("Houve um Empate!", canvas.width / 2, 450);
        }

        contexto.font = "25px 'Orelega One'";
        contexto.textAlign = "right";
        contexto.fillText(
            'Pressione "Enter" para voltar ao menu inicial', 
            canvas.width - 20, canvas.height - 20
        );
    }
}

const letras = {
    spr_letras: new Image(),

    aparece: {
        spr1: new Image(),
        spr2: new Image(),
        spr3: new Image(),
        spr4: new Image(),
        spr5: new Image(),
        spr6: new Image(),
        spr7: new Image(),
        spr8: new Image(),
        spr9: new Image(),
    },
    espera: {
        spr: new Image(),
    },
    errou: {
        spr1: new Image(),
        spr2: new Image(),
        spr3: new Image(),
        spr4: new Image(),
        spr5: new Image(),
        spr6: new Image(),
        spr7: new Image(),
        spr8: new Image(),
        spr9: new Image(),
    },
    acertou: {
        spr1: new Image(),
        spr2: new Image(),
        spr3: new Image(),
        spr4: new Image(),
        spr5: new Image(),
        spr6: new Image(),
        spr7: new Image(),
        spr8: new Image(),
        spr9: new Image(),
    },

    spriteX: 0,
    spriteY: 0,
    largura: 107,
    altura: 107,
    x: 0,
    y: 0,

    counter: 0,
    state: 0,
    zeraX: 0,
    number: 0,
    letter: 0,
    vezes: 0,
    sprite: 1,
    counter2: 0,

    desenha() {
        this.atualiza();

        contexto.drawImage(
            this.spr_letras,
            this.spriteX, this.spriteY,
            this.largura, this.altura,
            this.x, this.y,
            this.largura / 2, this.altura / 2
        )
    },

    atualiza() {
        {
            {
                this.aparece.spr1.src = "./sprites/loja/letra/aparece/letras 1.png";
                this.aparece.spr2.src = "./sprites/loja/letra/aparece/letras 2.png";
                this.aparece.spr3.src = "./sprites/loja/letra/aparece/letras 3.png";
                this.aparece.spr4.src = "./sprites/loja/letra/aparece/letras 4.png";
                this.aparece.spr5.src = "./sprites/loja/letra/aparece/letras 5.png";
                this.aparece.spr6.src = "./sprites/loja/letra/aparece/letras 6.png";
                this.aparece.spr7.src = "./sprites/loja/letra/aparece/letras 7.png";
                this.aparece.spr8.src = "./sprites/loja/letra/aparece/letras 8.png";
                this.aparece.spr9.src = "./sprites/loja/letra/aparece/letras 9.png";
            }

            {
                this.errou.spr1.src = "./sprites/loja/letra/vermelho/letras 1.png";
                this.errou.spr2.src = "./sprites/loja/letra/vermelho/letras 2.png";
                this.errou.spr3.src = "./sprites/loja/letra/vermelho/letras 3.png";
                this.errou.spr4.src = "./sprites/loja/letra/vermelho/letras 4.png";
                this.errou.spr5.src = "./sprites/loja/letra/vermelho/letras 5.png";
                this.errou.spr6.src = "./sprites/loja/letra/vermelho/letras 6.png";
                this.errou.spr7.src = "./sprites/loja/letra/vermelho/letras 7.png";
                this.errou.spr8.src = "./sprites/loja/letra/vermelho/letras 8.png";
                this.errou.spr9.src = "./sprites/loja/letra/vermelho/letras 9.png";
            }

            {
                this.acertou.spr1.src = "./sprites/loja/letra/verde/letras 1.png";
                this.acertou.spr2.src = "./sprites/loja/letra/verde/letras 2.png";
                this.acertou.spr3.src = "./sprites/loja/letra/verde/letras 3.png";
                this.acertou.spr4.src = "./sprites/loja/letra/verde/letras 4.png";
                this.acertou.spr5.src = "./sprites/loja/letra/verde/letras 5.png";
                this.acertou.spr6.src = "./sprites/loja/letra/verde/letras 6.png";
                this.acertou.spr7.src = "./sprites/loja/letra/verde/letras 7.png";
                this.acertou.spr8.src = "./sprites/loja/letra/verde/letras 8.png";
                this.acertou.spr9.src = "./sprites/loja/letra/verde/letras 9.png";
            }

            {
                this.espera.spr.src = "./sprites/loja/letra/letras.png";
            }
        }

        if (this.letter == 0) {
            this.spriteX = 0;
        }

        else if (this.letter == 1) {
            this.spriteX = 107;
        }

        else if (this.letter == 2) {
            this.spriteX = 214;
        }

        else if (this.letter == 3) {
            this.spriteX = 321;
        }

        else if (this.letter == 4) {
            this.spriteX = 428;
        }

        if (this.state == 0) {
            if (this.number == 0) {
                this.x = 80;
                this.y = 40;
            }

            else if (this.number == 1) {
                this.x = canvas.width / 2 - (this.largura / 2) / 2;
                this.y = 85;
            }

            else if (this.number == 2) {
                this.x = canvas.width - (80 + this.largura);
                this.y = 40;
            }

            else {
                this.x = canvas.width / 2 - (this.largura / 2) / 2;
                this.y = (canvas.height / 2) + 150;
            }


            if (this.counter == 4) {
                this.counter = 0;
                this.vezes ++;
                this.sprite ++;
            }

            if (this.vezes == 0) {
                this.spr_letras.src = this.aparece.spr1.src;
            }

            else if (this.vezes == 1) {
                this.spr_letras.src = this.aparece.spr2.src;
            }

            else if (this.vezes == 2) {
                this.spr_letras.src = this.aparece.spr3.src;
            }

            else if (this.vezes == 3) {
                this.spr_letras.src = this.aparece.spr4.src;
            }

            else if (this.vezes == 4) {
                this.spr_letras.src = this.aparece.spr5.src;
            }

            else if (this.vezes == 5) {
                this.spr_letras.src = this.aparece.spr6.src;
            }

            else if (this.vezes == 6) {
                this.spr_letras.src = this.aparece.spr7.src;
            }

            else if (this.vezes == 7) {
                this.spr_letras.src = this.aparece.spr8.src;
            }

            else if (this.vezes == 8) {
                this.spr_letras.src = this.aparece.spr9.src;
            }

            else if (this.vezes == 9) {
                this.vezes = 0;
                this.sprite = 1;
                this.state = 3;
            }

            this.counter ++;
        }

        else if (this.state == 1) {
            if (this.counter == 4) {
                this.sprite ++;
                this.counter = 0;
                this.vezes ++;
            }

            this.counter ++;

            if (this.vezes == 0) {
                this.spr_letras.src = this.errou.spr1.src;
            }

            else if (this.vezes == 1) {
                this.spr_letras.src = this.errou.spr2.src;
            }

            else if (this.vezes == 2) {
                this.spr_letras.src = this.errou.spr3.src;
            }

            else if (this.vezes == 3) {
                this.spr_letras.src = this.errou.spr4.src;
            }

            else if (this.vezes == 4) {
                this.spr_letras.src = this.errou.spr5.src;
            }

            else if (this.vezes == 5) {
                this.spr_letras.src = this.errou.spr6.src;
            }

            else if (this.vezes == 6) {
                this.spr_letras.src = this.errou.spr7.src;
            }

            else if (this.vezes == 7) {
                this.spr_letras.src = this.errou.spr8.src;
            }

            else if (this.vezes == 8) {
                this.spr_letras.src = this.errou.spr9.src;
            }

            else if (this.vezes == 9) {
                this.vezes = 0;
                this.click = 0;
                this.letter = 0;
                letter = 0;
                this.state = 0;
                this.sprite = 1;
            }
        }

        else if (this.state == 2) {
            if (this.counter == 4) {
                this.sprite ++;
                this.counter = 0;
                this.vezes ++;
            }

            this.counter ++;

            if (this.vezes == 0) {
                this.spr_letras.src = this.acertou.spr1.src;
                coin = 1;
            }

            else if (this.vezes == 1) {
                this.spr_letras.src = this.acertou.spr2.src;
            }

            else if (this.vezes == 2) {
                this.spr_letras.src = this.acertou.spr3.src;
            }

            else if (this.vezes == 3) {
                this.spr_letras.src = this.acertou.spr4.src;
            }

            else if (this.vezes == 4) {
                this.spr_letras.src = this.acertou.spr5.src;
            }

            else if (this.vezes == 5) {
                this.spr_letras.src = this.acertou.spr6.src;
            }

            else if (this.vezes == 6) {
                this.spr_letras.src = this.acertou.spr7.src;
            }

            else if (this.vezes == 7) {
                this.spr_letras.src = this.acertou.spr8.src;
            }

            else if (this.vezes == 8) {
                this.spr_letras.src = this.acertou.spr9.src;
            }

            else if (this.vezes == 9) {
                this.vezes = 0;
                this.click = 0;
                this.letter = 0;
                letter = 0;
                this.state = 0;
                this.sprite = 1;

                if (text_vez.vez == 1) {
                    player1.coins += 5;
                }

                else {
                    player2.coins += 5;
                }
            }
        }

        else if (this.state == 3) {
            this.spr_letras.src = this.espera.spr.src;

            this.counter2 ++;

            if (this.counter2 == 100) {
                this.click = 2;
                this.counter2 = 0;
            }

            if (this.click == 1) {
                this.state = 2;
            }

            else if (this.click == 2) {
                this.state = 1;
            }
        }

        if (textoVez == 1 || drawWizard == 1) {
            letter = 0;
            this.counter = 0;
            this.state = 0;
            this.zeraX = 0;
            this.number = 0;
            this.vezes = 0;
            this.sprite = 1;
            this.counter2 = 0;
        }
    },
}

const loja = {
    background: {
        spr: new Image(),
        x: 57.5,
        y: 82,
        largura: 626,
        altura: 436,
    },

    moldura: {
        spr: new Image(),
        x: 0,
        y: 385,
        largura: 128,
        altura: 128,
    },

    logo: {
        spr: new Image(),
        x: ((canvas.width / 2) - ((712 / 3) / 2)),
        y: 10,
        largura: 712,
        altura: 353,
    },

    coins: {
        spr: new Image(),
        x: 615,
        y: 112,
        largura: 20,
        altura: 20,
        spriteX: 0,
        spriteY: 0,
        counter: 0,
    },

    itens: {
        forca: {
            spr: new Image(),
            preco: 10,
            x: 57.5 + 5,
            y: 385,
            largura: 128,
            altura: 128,
        },

        revive: {
            spr: new Image(),
            preco: 20,
            x: 57.5 + 10 + 128,
            y: 385,
            largura: 128,
            altura: 128,
        },

        protect: {
            spr: new Image(),
            preco: 15,
            x: 57.5 + 15 + 256,
            y: 385,
            largura: 128,
            altura: 128,
        },

        red_mush: {
            spr: new Image(),
            preco: 5,
            x: 57.5 + 20 + 384,
            y: 385,
            largura: 128,
            altura: 128,
        },

        green_mush: {
            spr: new Image(),
            preco: 5,
            x: 57.5 + 25 + 512,
            y: 385,
            largura: 128,
            altura: 128,
        },
    },

    spriteX: 0,
    spriteY: 0,
    selecao: 0,
    string_title: "",
    string_body: "",
    string_body_line2: "",
    string_cost: "",
    off1: 0,
    off2: 0,
    off3: 0,
    off4: 0,
    off5: 0,
    off1_2: 0,
    off2_2: 0,
    off3_2: 0,
    off4_2: 0,
    off5_2: 0,
    lock: 0,

    desenha() { 
        {
            this.background.spr.src = "./sprites/loja/background/spr1.png";
            this.moldura.spr.src = "./sprites/loja/selecao.png";
            this.coins.spr.src = "./sprites/loja/coin.png";
            this.logo.spr.src = "./sprites/loja/logo/background.png";

            {
                this.itens.revive.spr.src = "./sprites/loja/itens/medallion of life/spr1.png";
                this.itens.protect.spr.src = "./sprites/loja/itens/protection medallion/spr1.png";
                this.itens.forca.spr.src = "./sprites/loja/itens/upgrade de forca/spr1.png";
                this.itens.red_mush.spr.src = "./sprites/loja/itens/red mushroom/spr1.png";
                this.itens.green_mush.spr.src = "./sprites/loja/itens/green mushroom/spr1.png";
            }
        }

        if (this.selecao == 0) {
            this.string_title = "";
            this.string_body = "";
            this.string_body_line2 = "Por favor selecione algum produto...";
            this.string_cost = "";
        }

        contexto.fillStyle = "rgba(0, 0, 0, 0.5)";
        contexto.fillRect(0, 0, canvas.width, canvas.height);

        contexto.drawImage(
            this.background.spr,
            this.spriteX, this.spriteY,
            this.background.largura, this.background.altura,
            this.background.x, this.background.y,
            this.background.largura + 44, this.background.altura
        )

        contexto.drawImage(
            this.logo.spr, 
            this.spriteX, this.spriteY,
            this.logo.largura, this.logo.altura,
            this.logo.x, this.logo.y,
            this.logo.largura / 3, this.logo.altura / 3
        )

        contexto.font = "60px 'Carter One'";
        contexto.textAlign = "center";
        contexto.fillText("Loja", canvas.width / 2, 25 + (this.logo.altura / 3) / 2);

        contexto.fillStyle = "white";
        contexto.font = "30px 'Georgia'";
        contexto.textAlign = "left";

        if (text_vez.vez == 1) {
            contexto.fillText(" x " + player1.coins, 655, 143);
        }

        else {
            contexto.fillText(" x " + player2.coins, 655, 143);
        }

        this.atualiza(2);

        contexto.drawImage(
            this.coins.spr,
            this.coins.spriteX, this.coins.spriteY,
            this.coins.largura, this.coins.altura,
            this.coins.x, this.coins.y,
            this.coins.largura * 2, this.coins.altura * 2
        )

        contexto.font = "40px 'Patua One'";

        contexto.fillText(this.string_title, 100, 160);

        contexto.font = "30px 'Gentium Book Plus'";

        contexto.fillText(this.string_body, 100, 250);
        contexto.fillText(this.string_body_line2, 100, 290);

        contexto.font = "20px";
        contexto.fillStyle = "rgb(255, 0, 0)";

        contexto.fillText(this.string_cost, 100, 370);

        this.atualiza(1);

        if (this.selecao != 0) {
            contexto.drawImage(
                this.moldura.spr,
                this.spriteX, this.spriteY,
                this.moldura.largura, this.moldura.altura,
                this.moldura.x, this.moldura.y,
                this.moldura.largura, this.moldura.altura
            )
        }

        if (text_vez.vez == 1) {
            if (this.off1 == 0) {
                contexto.drawImage(
                    this.itens.forca.spr,
                    this.spriteX, this.spriteY,
                    this.itens.forca.largura, this.itens.forca.altura,
                    this.itens.forca.x, this.itens.forca.y,
                    this.itens.forca.largura, this.itens.forca.altura
                )
            }
            
            if (this.off2 == 0) {
                contexto.drawImage(
                    this.itens.revive.spr,
                    this.spriteX, this.spriteY,
                    this.itens.revive.largura, this.itens.revive.altura,
                    this.itens.revive.x, this.itens.revive.y,
                    this.itens.revive.largura, this.itens.revive.altura
                )
            }
            
            if (this.off3 == 0) {
                contexto.drawImage(
                    this.itens.protect.spr,
                    this.spriteX, this.spriteY,
                    this.itens.protect.largura, this.itens.protect.altura,
                    this.itens.protect.x, this.itens.protect.y,
                    this.itens.protect.largura, this.itens.protect.altura
                )
            }
            
            if (this.off4 == 0) {
                contexto.drawImage(
                    this.itens.red_mush.spr,
                    this.spriteX, this.spriteY,
                    this.itens.red_mush.largura, this.itens.red_mush.altura,
                    this.itens.red_mush.x, this.itens.red_mush.y,
                    this.itens.red_mush.largura, this.itens.red_mush.altura
                )
            }
            
            if (this.off5 == 0) {
                contexto.drawImage(
                    this.itens.green_mush.spr,
                    this.spriteX, this.spriteY,
                    this.itens.green_mush.largura, this.itens.green_mush.altura,
                    this.itens.green_mush.x, this.itens.green_mush.y,
                    this.itens.green_mush.largura, this.itens.green_mush.altura
                )
            }
        }

        else {
            if (this.off1_2 == 0) {
                contexto.drawImage(
                    this.itens.forca.spr,
                    this.spriteX, this.spriteY,
                    this.itens.forca.largura, this.itens.forca.altura,
                    this.itens.forca.x, this.itens.forca.y,
                    this.itens.forca.largura, this.itens.forca.altura
                )
            }
            
            if (this.off2_2 == 0) {
                contexto.drawImage(
                    this.itens.revive.spr,
                    this.spriteX, this.spriteY,
                    this.itens.revive.largura, this.itens.revive.altura,
                    this.itens.revive.x, this.itens.revive.y,
                    this.itens.revive.largura, this.itens.revive.altura
                )
            }
            
            if (this.off3_2 == 0) {
                contexto.drawImage(
                    this.itens.protect.spr,
                    this.spriteX, this.spriteY,
                    this.itens.protect.largura, this.itens.protect.altura,
                    this.itens.protect.x, this.itens.protect.y,
                    this.itens.protect.largura, this.itens.protect.altura
                )
            }
            
            if (this.off4_2 == 0) {
                contexto.drawImage(
                    this.itens.red_mush.spr,
                    this.spriteX, this.spriteY,
                    this.itens.red_mush.largura, this.itens.red_mush.altura,
                    this.itens.red_mush.x, this.itens.red_mush.y,
                    this.itens.red_mush.largura, this.itens.red_mush.altura
                )
            }
            
            if (this.off5_2 == 0) {
                contexto.drawImage(
                    this.itens.green_mush.spr,
                    this.spriteX, this.spriteY,
                    this.itens.green_mush.largura, this.itens.green_mush.altura,
                    this.itens.green_mush.x, this.itens.green_mush.y,
                    this.itens.green_mush.largura, this.itens.green_mush.altura
                )
            }
        }
    },

    atualiza(num) {
        if (num == 1) {
            if (this.selecao == 1) {
                if (text_vez.vez == 1) {
                    if (this.off1 == 0) {
                        this.string_cost = "Custo: 10 moedas";
                    }

                    else {
                        this.string_cost = "Desculpe este produto esta esgotado";
                    }
                }

                else {
                    if (this.off1_2 == 0) {
                        this.string_cost = "Custo: 10 moedas";
                    }

                    else {
                        this.string_cost = "Desculpe este produto esta esgotado";
                    }
                }

                this.moldura.x = 57.5 + 5;
                this.string_title = "Reforco de ataque";
                this.string_body = "Um item especial que possui a habilidade de";
                this.string_body_line2 = "dobrar a forca de seu portador durante 3 turnos";
            }

            else if (this.selecao == 2) {
                if (text_vez.vez == 1) {
                    if (this.off2 == 0) {
                        this.string_cost = "Custo: 20 moedas";
                    }

                    else {
                        this.string_cost = "Desculpe este produto esta esgotado";
                    }
                }

                else {
                    if (this.off2_2 == 0) {
                        this.string_cost = "Custo: 20 moedas";
                    }

                    else {
                        this.string_cost = "Desculpe este produto esta esgotado";
                    }
                }

                this.moldura.x = 57.5 + 10 + 128;
                this.string_title = "Medalhao da vida";
                this.string_body = "Um artefato antigo que concede";
                this.string_body_line2 = "ao seu dono a imortalidade";
            }

            else if (this.selecao == 3) {
                if (text_vez.vez == 1) {
                    if (this.off3 == 0) {
                        this.string_cost = "Custo: 15 moedas";
                    }

                    else {
                        this.string_cost = "Desculpe este produto esta esgotado";
                    }
                }

                else {
                    if (this.off3_2 == 0) {
                        this.string_cost = "Custo: 15 moedas";
                    }

                    else {
                        this.string_cost = "Desculpe este produto esta esgotado";
                    }
                }

                this.moldura.x = 57.5 + 15 + 256;
                this.string_title = "Medalhao da protecao";
                this.string_body = "Uma curiosa reliquia que impede seu portador";
                this.string_body_line2 = "de ser atacado por magia durante 3 turnos";
            }

            else if (this.selecao == 4) {
                if (text_vez.vez == 1) {
                    if (this.off4 == 0) {
                        this.string_cost = "Custo: 5 moedas";
                    }

                    else {
                        this.string_cost = "Desculpe este produto esta esgotado";
                    }
                }

                else {
                    if (this.off4_2 == 0) {
                        this.string_cost = "Custo: 5 moedas";
                    }

                    else {
                        this.string_cost = "Desculpe este produto esta esgotado";
                    }
                }

                this.moldura.x = 57.5 + 20 + 384;
                this.string_title = "Cogumelo vermelho";
                this.string_body = "Apenas um simples cogumelo vermelho,";
                this.string_body_line2 = "recupera 10 pontos de vida";
            }

            else if (this.selecao == 5) {
                if (text_vez.vez == 1) {
                    if (this.off5 == 0) {
                        this.string_cost = "Custo: 5 moedas";
                    }

                    else {
                        this.string_cost = "Desculpe este produto esta esgotado";
                    }
                }

                else {
                    if (this.off5_2 == 0) {
                        this.string_cost = "Custo: 5 moedas";
                    }

                    else {
                        this.string_cost = "Desculpe este produto esta esgotado";
                    }
                }

                this.moldura.x = 57.5 + 25 + 512;
                this.string_title = "Cogumelo verde";
                this.string_body = "Um cogumelo que ao ser ingerido";
                this.string_body_line2 = "recupera intantaneamente o seu ataque forte";
            }
        }
        
        else {
            if (this.coins.counter == 4) {
                if (this.coins.spriteX < 160) {
                    this.coins.spriteX += 20;
                }

                else {
                    this.coins.spriteX = 0;
                }

                this.coins.counter = 0;
            }

            this.coins.counter ++;
        }
    },

    acao() {
        if (this.selecao == 1) {
            if (text_vez.vez == 1) {
                if (this.off1 == 0) {
                    if (player1.coins >= this.itens.forca.preco) {
                        player1.ataque1 += 10;
                        player1.ataque2 += 10;
                        this.off1 = 1;
                        alert("Item adquirido!\nReforco de Forca");
                        player1.reforco = 3;
                        this.lock = 1;
                        player1.coins -= this.itens.forca.preco;
                    }

                    else {
                        alert("ERROR\n\nVoce nao possui o dinheiro suficiente!");
                        this.lock = 0;
                    }
                }

                else {
                    alert("Item esgotado!");
                    this.lock = 0;
                }
            }

            else {
                if (this.off1_2 == 0) {
                    if (player2.coins >= this.itens.forca.preco) {
                        player2.ataque1 += 10;
                        player2.ataque2 += 10;
                        this.off1_2 = 1;
                        alert("Item adquirido!\nReforco de Forca");
                        player2.reforco = 3;
                        this.lock = 1;
                        player2.coins -= this.itens.forca.preco;
                    }

                    else {
                        alert("ERROR\n\nVoce nao possui o dinheiro suficiente!");
                        this.lock = 0;
                    }
                }

                else {
                    alert("Item esgotado!");
                    this.lock = 0;
                }
            }
        }

        else if (this.selecao == 2) {
            if (text_vez.vez == 1) {
                if (this.off2 == 0) {
                    if (player1.coins >= this.itens.revive.preco) {
                        this.lock = 1;
                        player1.revive = 1;
                        this.off2 = 1;
                        alert("Item adquirido!\nMedalhao da Vida");
                        player1.coins -= this.itens.revive.preco;
                    }

                    else {
                        alert("ERROR\n\nVoce nao possui o dinheiro suficiente!");
                        this.lock = 0;
                    }
                }

                else {
                    alert("Item esgotado!");
                    this.lock = 0;
                }
            }

            else {
                if (this.off2_2 == 0) {
                    if (player2.coins >= this.itens.revive.preco) {
                        this.lock = 1;
                        player2.revive = 1;
                        this.off2_2 = 1;
                        alert("Item adquirido!\nMedalhao da Vida");
                        player2.coins -= this.itens.revive.preco;
                    }

                    else {
                        alert("ERROR\n\nVoce nao possui o dinheiro suficiente!");
                        this.lock = 0;
                    }
                }

                else {
                    this.lock = 0;
                    alert("Item esgotado!");
                }
            }
        }

        else if (this.selecao == 3) {
            if (text_vez.vez == 1) {
                if (this.off3 == 0) {
                    if (player1.coins >= this.itens.protect.preco) {
                        this.lock = 1;
                        player1.protect = 3;
                        this.off3 = 1;
                        alert("Item adquirido!\nMedalhao da Protecao");
                        player1.coins -= this.itens.protect.preco;
                    }

                    else {
                        alert("ERROR\n\nVoce nao possui o dinheiro suficiente!");
                        this.lock = 0;
                    }
                }

                else {
                    this.lock = 0;
                    alert("Item esgotado!");
                }
            }

            else {
                if (this.off3_2 == 0) {
                    if (player2.coins >= this.itens.protect.preco) {
                        this.lock = 1;
                        player2.protect = 3;
                        this.off3_2 = 1;
                        alert("Item adquirido!\nMedalhao da Protecao");
                        player2.coins -= this.itens.protect.preco;
                    }

                    else {
                        alert("ERROR\n\nVoce nao possui o dinheiro suficiente!");
                        this.lock = 0;
                    }
                }

                else {
                    this.lock = 0;
                    alert("Item esgotado!");
                }
            }
        }

        else if (this.selecao == 4) {
            if (text_vez.vez == 1) {
                if (this.off4 == 0) {
                    if (player1.coins >= this.itens.red_mush.preco) {
                        this.lock = 1;

                        if (player1.vida <= 35) {
                            player1.vida += 15;
                        }

                        else {
                            player1.vida = 50;
                        }

                        this.off4 = 1;
                        alert("Item adquirido!\nCogumelo Vermelho");
                        player1.coins -= this.itens.red_mush.preco;
                    }

                    else {
                        alert("ERROR\n\nVoce nao possui o dinheiro suficiente!");
                        this.lock = 0;
                    }
                    
                }

                else {
                    this.lock = 0;
                    alert("Item esgotado!");
                }
            }

            else {
                if (this.off4_2 == 0) {
                    if (player2.coins >= this.itens.red_mush.preco) {
                        this.lock = 1;

                        if (player2.vida <= 35) {
                            player2.vida += 15;
                        }

                        else {
                            player2.vida = 50;
                        }

                        alert("Item adquirido!\nCogumelo Vermelho");
                        this.off4_2 = 1;
                        player2.coins -= this.itens.red_mush.preco;
                    }

                    else {
                        alert("ERROR\n\nVoce nao possui o dinheiro suficiente!");
                        this.lock = 0;
                    }
                    
                }

                else {
                    alert("Item esgotado!");
                    this.lock = 0;
                }
            }
        }

        else if (this.selecao == 5) {
            if (text_vez.vez == 1) {
                if (this.off5 == 0) {
                    if (player1.coins >= this.itens.green_mush.preco) {
                        this.lock = 1;
                        player1.recovery = 4;
                        this.off5 = 1;
                        alert("Item adquirido!\nCogumelo Verde");
                        player1.coins -= this.itens.green_mush.preco;
                    }

                    else {
                        alert("ERROR\n\nVoce nao possui o dinheiro suficiente!");
                        this.lock = 0;
                    }
                }

                else {
                    this.lock = 0;
                    alert("Item esgotado!");
                }
            }

            else {
                if (this.off5_2 == 0) {
                    if (player2.coins >= this.itens.green_mush.preco) {
                        this.lock = 1;
                        player2.recovery = 4;
                        this.off5_2 = 1;
                        alert("Item adquirido!\nCogumelo Verde");
                        player2.coins -= this.itens.green_mush.preco;
                    }

                    else {
                        alert("ERROR\n\nVoce nao possui o dinheiro suficiente!");
                        this.lock = 0;
                    }
                    
                }

                else {
                    this.lock = 0;
                    alert("Item esgotado!");
                }
            }
        }

        this.selecao = 0;

        if (this.lock == 1) {
            lojaTurn = 0;
        }

        else {
            lojaTurn = 1;
        }
    },
}

const btn_loja = {
    desenha() {
        contexto.fillStyle = "rgba(0, 0, 0, 0.6)";
        contexto.fillRect(canvas.width / 2 - 13, 511, 25, 25);
        contexto.textAlign = "center";
        contexto.fillStyle = "white";
        contexto.font = "20px 'Times New Roman'";
        contexto.fillText("L", canvas.width / 2, 530);
    }
}

const tutorial = {
    part1: 1,
    part2: 0,
    part3: 0,
    part4: 0,
    part5: 0,
    part6: 0,
    alpha: 1,
    alpha1: 1,
    counter: 0,
    counter1: 0,
    black_screen: 1,
    black_screen2: 1,
    right: 0,
    left: 0,
    confirm: 0,
    enter: 0,
    spriteX: 0,
    text: 1,

    spr_attack: {
        spr: new Image(),
        spr1: new Image(),
        spr2: new Image(),
        spr3: new Image(),
        spr4: new Image(),
        spr5: new Image(),
    },

    spr_shield: new Image(),

    desenha() {
        {
            {
                this.spr_attack.spr1.src = "./sprites/botoes/ataque forte/vazio 2.png";
                this.spr_attack.spr2.src = "./sprites/botoes/ataque forte/1.4 2.png";
                this.spr_attack.spr3.src = "./sprites/botoes/ataque forte/2.4 2.png";
                this.spr_attack.spr4.src = "./sprites/botoes/ataque forte/3.4 2.png";
                this.spr_attack.spr5.src = "./sprites/botoes/ataque forte/full 2.png";
            }

            {
                this.spr_shield.src = "./sprites/shield.png";
            }
        }

        contexto.textAlign = "center";
        contexto.font = "40px 'Carter One'";

        if (this.part1 == 1) {
            contexto.fillStyle = "rgba(255, 255, 255, " + this.alpha + ")";
            contexto.fillText("Tutorial", canvas.width / 2, canvas.height / 2);
            this.counter ++;

            if (this.black_screen2 == 1) {
                contexto.fillStyle = "rgba(0, 0, 0, " + this.alpha1 + ")";
                contexto.fillRect(0, 0, canvas.width, canvas.height);

                this.alpha1 -= 0.01;

                if (this.alpha1 <= 0) {
                    this.black_screen2 = 0;
                    this.alpha1 = 0;
                }
            }

            if (this.counter >= 200) {
                this.alpha -= 0.01;
            }

            if (this.alpha <= 0) {
                this.counter = 0;
                this.part1 = 0;
                this.part2 = 1;
                this.alpha = 1;
            }
        }
        
        else if (this.part2 == 1) {
            contexto.fillStyle = "white";
            contexto.fillText("Use as setas para a", canvas.width / 2, canvas.height / 2 - 60);
            contexto.fillText("esquerda/direita para selecionar acoes", canvas.width / 2, canvas.height / 2 - 20);

            if (this.black_screen == 1) {
                contexto.fillStyle = "rgba(0, 0, 0, " + this.alpha + ")";
                contexto.fillRect(0, 0, canvas.width, canvas.height);

                this.alpha -= 0.01;

                if (this.alpha <= 0) {
                    this.black_screen = 0;
                    this.alpha = 0;
                }
            }

            if (this.confirm == 1) {
                if (this.alpha1 < 1) {
                    contexto.fillStyle = "rgba(255, 255, 255, " + this.alpha1 + ")";
                    this.alpha1 += 0.01;
                }

                else {
                    this.alpha1 = 1;
                    contexto.fillStyle = "white";
                }
                
                contexto.fillText("Quando houver selecionado alguma", canvas.width / 2, canvas.height / 2 + 20);
                contexto.fillText("acao use [Enter] para confirmar", canvas.width / 2, canvas.height / 2 + 60);
            }

            if (this.enter == 1) {
                this.counter ++;

                if (this.counter >= 100) {
                    contexto.fillStyle = "rgba(0, 0, 0, " + this.alpha + ")";
                    contexto.fillRect(0, 0, canvas.width, canvas.height);

                    this.alpha += 0.01;

                    if (this.alpha >= 1) {
                        this.alpha = 1;
                        this.part2 = 0;
                        this.part3 = 1;
                        this.counter = 0;
                        this.black_screen = 1;
                    }
                }
            }

            if (this.right == 1 && this.left == 1) {
                this.confirm = 1; 
            }
        }

        else if (this.part3 == 1) {
            contexto.fillStyle = "white";
            contexto.fillText("Voce possui um ataque forte!", canvas.width / 2, canvas.height / 2 - 40);
            contexto.fillText("Mas nem tudo sao flores...", canvas.width / 2, canvas.height / 2);
            contexto.fillText("Ao ser usado ele precisa ser recarregado", canvas.width / 2, canvas.height / 2 + 40);
        
            this.animacao();

            contexto.drawImage(
                this.spr_attack.spr,
                canvas.width / 2 - 63, 460
            )

            if (this.black_screen == 1) {
                contexto.fillStyle = "rgba(0, 0, 0, " + this.alpha + ")";
                contexto.fillRect(0, 0, canvas.width, canvas.height);

                this.alpha -= 0.01;

                if (this.alpha <= 0) {
                    this.black_screen = 0;
                    this.alpha = 0;
                }
            }

            this.counter ++;
            botoes.selecao = 0;

            if (this.counter >= 400) {
                contexto.fillStyle = "rgba(0, 0, 0, " + this.alpha + ")";
                contexto.fillRect(0, 0, canvas.width, canvas.height);
                this.alpha += 0.01;

                if (this.alpha >= 1) {
                    this.alpha = 1;
                    this.part3 = 0;
                    this.part4 = 1;
                    this.counter = 0;
                    this.black_screen = 1;
                    this.counter1 = 0;
                }
            }
        }

        else if (this.part4 == 1) {
            contexto.fillStyle = "white";
            contexto.fillText("Com o passar dos turnos", canvas.width / 2, canvas.height / 2 - 20);
            contexto.fillText("seu escudo vai se desgastando", canvas.width / 2, canvas.height / 2 + 20);

            this.animacao();

            contexto.drawImage(
                this.spr_shield,
                this.spriteX, 0,
                160, 160,
                canvas.width / 2 - 80, 400,
                160, 160
            )

            if (this.black_screen == 1) {
                contexto.fillStyle = "rgba(0, 0, 0, " + this.alpha + ")";
                contexto.fillRect(0, 0, canvas.width, canvas.height);

                this.alpha -= 0.01;

                if (this.alpha <= 0) {
                    this.alpha = 0;
                    this.black_screen = 0;
                }
            }

            this.counter ++;

            if (this.counter >= 400) {
                contexto.fillStyle = "rgba(0, 0, 0, " + this.alpha + ")";
                contexto.fillRect(0, 0, canvas.width, canvas.height);
                this.alpha += 0.01;
                
                if (this.alpha >= 1) {
                    this.alpha = 1;
                    this.counter = 0;
                    this.counter1 = 0;
                    this.part4 = 0;
                    this.part5 = 1;
                    this.black_screen = 1;
                }
            }
        }

        else if (this.part5 == 1) {
            contexto.fillStyle = "white";
            contexto.fillText("Em alguns momentos da sua gameplay", canvas.width / 2, canvas.height / 2 - 60);
            contexto.fillText("voce vai se deparar com", canvas.width / 2, canvas.height / 2 - 20);
            contexto.fillText("eventos de tempo rapido,", canvas.width / 2, canvas.height / 2 + 20);
            contexto.fillText("conclua eles para ganhar moedas", canvas.width / 2, canvas.height / 2 + 60);

            if (this.black_screen == 1) {
                contexto.fillStyle = "rgba(0, 0, 0, " + this.alpha + ")";
                contexto.fillRect(0, 0, canvas.width, canvas.height);

                this.alpha -= 0.01;

                if (this.alpha <= 0) {
                    this.alpha = 0;
                    this.black_screen = 0;
                }
            }

            this.counter ++;

            if (this.counter >= 400) {
                contexto.fillStyle = "rgba(0, 0, 0, " + this.alpha + ")";
                contexto.fillRect(0, 0, canvas.width, canvas.height);

                this.alpha += 0.01;

                if (this.alpha >= 1) {
                    this.alpha = 1;
                    this.black_screen = 1;
                    this.part5 = 0;
                    this.part6 = 1;
                    this.counter = 0;
                }
            }
        }

        else if (this.part6 == 1) {
            contexto.fillStyle = "white";
            contexto.fillText("Quando este botao", canvas.width / 2, canvas.height / 2 - 40);
            contexto.fillText("estiver habilitado aperte", canvas.width / 2, canvas.height / 2);
            contexto.fillText('"L" para abrir a loja', canvas.width / 2, canvas.height / 2 + 40);

            if (this.black_screen == 1) {
                contexto.fillStyle = "rgba(0, 0, 0, " + this.alpha + ")";
                contexto.fillRect(0, 0, canvas.width, canvas.height);

                this.alpha -= 0.01;

                if (this.alpha <= 0) {
                    this.alpha = 0;
                    this.black_screen = 0;
                }
            }

            this.counter ++;

            if (this.counter >= 400) {
                contexto.fillStyle = "rgba(0, 0, 0, " + this.alpha + ")";
                contexto.fillRect(0, 0, canvas.width, canvas.height);

                this.alpha += 0.01;

                if (this.alpha >= 1) {
                    this.alpha = 1;
                    this.black_screen = 1;
                    this.part6 = 0;
                    this.counter = 0;
                }
            }
        }

        else {
            contexto.fillStyle = "white";

            if (this.text == 1) {
                contexto.fillText("Agora", canvas.width / 2, canvas.height / 2);
            }
            
            else {
                contexto.fillText("Vamos comecar", canvas.width / 2, canvas.height / 2);
            }
            
            if (this.black_screen == 1) {
                contexto.fillStyle = "rgba(0, 0, 0, " + this.alpha + ")";
                contexto.fillRect(0, 0, canvas.width, canvas.height);

                this.alpha -= 0.01;

                if (this.alpha <= 0) {
                    this.alpha = 0;
                    this.black_screen = 0;
                }
            }

            this.counter ++;

            if (this.counter >= 200) {
                contexto.fillStyle = "rgba(0, 0, 0, " + this.alpha + ")";
                contexto.fillRect(0, 0, canvas.width, canvas.height);
                this.alpha += 0.01;

                if (this.alpha >= 1) {
                    this.counter = 0;
                    this.alpha = 1;

                    if (this.text == 1) {
                        this.black_screen = 1;
                        this.text ++;
                    }
                    
                    else {
                        transOn = 1;
                        tuto = 1;
                    }
                }
            }
        }
    },

    animacao() {
        if (this.part3 == 1) {
            this.counter1 ++;

            if (this.counter1 <= 36) {
                this.spr_attack.spr.src = this.spr_attack.spr1.src;
            }
            
            else if (this.counter1 <= 72) {
                this.spr_attack.spr.src = this.spr_attack.spr2.src;
            }

            else if (this.counter1 <= 108) {
                this.spr_attack.spr.src = this.spr_attack.spr3.src;
            }

            else if (this.counter1 <= 144) {
                this.spr_attack.spr.src = this.spr_attack.spr4.src;
            }

            else if (this.counter1 <= 180) {
                this.spr_attack.spr.src = this.spr_attack.spr5.src;
            }

            else {
                this.counter1 = 0;
            }
        }
        
        else if (this.part4 == 1) {
            this.counter1 ++;

            if (this.counter1 <= 36) {
                this.spriteX = 0;
            }

            else if (this.counter1 <= 72) {
                this.spriteX = 160;
            }

            else if (this.counter1 <= 108) {
                this.spriteX = 320;
            }

            else if (this.counter1 <= 144) {
                this.spriteX = 480;
            }

            else {
                this.counter1 = 0;
            }
        }
    }
}

const previa = {
    desenha() {
        contexto.fillStyle = "black";
        contexto.fillRect(0, 0, canvas.width, canvas.height);

        contexto.fillStyle = "white";
        contexto.textAlign = "center";
        contexto.font = "40px 'Carter One'";
        contexto.fillText("Clique em qualquer", canvas.width / 2, canvas.height / 2 - 20);
        contexto.fillText("lugar da tela para comecar", canvas.width / 2, canvas.height / 2 + 20);
    }
}

const sonoplastia = {
    musicas: {
        inicio: {
            intro: new Audio("./sons/musicas/inicio/intro.wav"),
            loop: new Audio("./sons/musicas/inicio/loop.wav"),
        },

        tutorial: {
            intro: new Audio("./sons/musicas/tutorial/intro.wav"),
            loop: new Audio("./sons/musicas/tutorial/loop.wav"),
        },

        jogo: {
            intro: new Audio("./sons/musicas/jogo/intro.wav"),
            loop: new Audio("./sons/musicas/jogo/loop.wav"),
        },

        final: {
            intro: new Audio("./sons/musicas/final/intro.wav"),
        },
    },

    efeitos: {
        jogo: {
            hurt: new Audio("./sons/efeitos/jogo/hurt.wav"),
            mago_entra: new Audio("./sons/efeitos/jogo/mago entra.wav"),
            mago_ri: new Audio("./sons/efeitos/jogo/mago risada.wav"),
            ataque: new Audio("./sons/efeitos/jogo/ataque.wav"),
            ataque_forte: new Audio("./sons/efeitos/jogo/ataque forte.wav"),
            sucesso: new Audio("./sons/efeitos/jogo/sucess.wav"),
            fracasso: new Audio("./sons/efeitos/jogo/fracasso.wav"),
            loja: new Audio("./sons/efeitos/jogo/loja.wav"),
        },

        arrow: new Audio("./sons/efeitos/arrow.wav"),
        enter: new Audio("./sons/efeitos/enter.wav"),
    },

    volume: 1,
    counter: 0,
    oneway: 1, 
    oneway1: 1,
    oneway2: 1,
    oneway3: 1,
    enter: 0,
    select: 0,
    one: 1,
    one1: 1,
    one2: 1,
    one3: 1,
    loja: 0,

    reproduz() {
        if (telaAtiva == telas.inicio) {
            if (this.oneway == 1) {
                this.musicas.inicio.intro.play();
                this.oneway = 0;
            }

            this.counter ++;

            if (this.oneway1 == 1) {
                if (this.counter == 4080) {
                    this.musicas.inicio.intro.pause();
                    this.oneway1 = 0;
                    this.counter = 0;
                    this.musicas.inicio.loop.play();
                }
            }

            else {
                if (this.counter == 3312) {
                    this.musicas.inicio.loop.pause();
                    this.musicas.inicio.loop.currentTime = 0;
                    this.musicas.inicio.loop.play();
                    this.counter = 0;
                }
            }

            this.musicas.inicio.intro.volume = this.volume;
            this.musicas.inicio.loop.volume = this.volume;
        }

        else if (telaAtiva == telas.lobby) {
            if (this.oneway == 1) {
                this.musicas.inicio.intro.play();
                this.oneway = 0;
            }

            this.counter ++;

            if (this.oneway1 == 1) {
                if (this.counter == 4080) {
                    this.musicas.inicio.intro.pause();
                    this.oneway1 = 0;
                    this.counter = 0;
                    this.musicas.inicio.loop.play();
                }
            }

            else {
                if (this.counter == 3312) {
                    this.musicas.inicio.loop.pause();
                    this.musicas.inicio.loop.currentTime = 0;
                    this.musicas.inicio.loop.play();
                    this.counter = 0;
                }
            }

            this.musicas.inicio.intro.volume = this.volume;
            this.musicas.inicio.loop.volume = this.volume;
        }

        else if (telaAtiva == telas.tutorial) {
            if (this.oneway2 == 1) {
                this.musicas.tutorial.intro.play();
                this.oneway2 = 0;
                this.counter = 0;
                this.volume = 1;
            }

            this.counter ++;

            if (this.oneway3 == 1) {
                if (this.counter == 5001) {
                    this.counter = 0;
                    this.musicas.tutorial.intro.pause();
                    this.musicas.tutorial.loop.play();
                    this.oneway3 = 0;
                }
            }
            
            else {
                if (this.counter == 4287) {
                    this.musicas.tutorial.loop.pause();
                    this.musicas.tutorial.loop.currentTime = 0;
                    this.musicas.tutorial.loop.play();
                    this.counter = 0;
                }
            }

            this.oneway = 1;
            this.oneway1 = 1;

            this.musicas.tutorial.intro.volume = this.volume;
            this.musicas.tutorial.loop.volume = this.volume;
        }

        else if (telaAtiva == telas.jogo) {
            if (this.oneway == 1) {
                this.musicas.jogo.intro.play();
                this.oneway = 0;
                this.counter = 0;
            }

            this.counter ++;

            if (this.oneway1 == 1) {
                if (this.counter == 7380) {
                    this.musicas.jogo.intro.pause();
                    this.musicas.jogo.loop.play();
                    this.oneway1 = 0;
                    this.counter = 0;
                }
            }
            
            else {
                if (this.counter == 6540) {
                    this.musicas.jogo.loop.pause();
                    this.musicas.jogo.loop.currentTime = 0;
                    this.musicas.jogo.loop.play();
                    this.counter = 0;
                }
            }

            if (player1.state == 4 || player2.state == 4) {
                this.efeitos.jogo.hurt.play();
            }

            if (player1.state == 1 || player2.state == 1) {
                this.efeitos.jogo.ataque.play();
            }

            if (player1.state == 2 || player2.state == 2) {
                this.efeitos.jogo.ataque_forte.play();
            }

            if (wizard.onde == 0 && drawWizard == 1) {
                if (this.one == 1) {
                    this.efeitos.jogo.mago_entra.play();
                    this.one = 0;
                    this.one1 = 1;
                }
            }

            else if (wizard.chegou == 1 && this.one1 == 1 && drawWizard == 1) {
                this.efeitos.jogo.mago_ri.play();
                this.one1 = 0;
                this.one = 1;
            }

            if (wizard.retirar == 1 && drawWizard == 1) {
                if (this.one == 1) {
                    this.efeitos.jogo.mago_entra.play();
                    this.one = 0;
                }
            }

            if (drawWizard == 0) {
                this.efeitos.jogo.mago_entra.pause();
                this.efeitos.jogo.mago_entra.currentTime = 0;
            }

            if (letras.state == 2 && this.one2 == 1) {
                this.efeitos.jogo.sucesso.play();
                this.one2 = 0;
            }

            if (letras.state == 1 && this.one3 == 1) {
                this.efeitos.jogo.fracasso.play();
                this.one3 = 0;
            }

            if (this.loja == 1) {
                this.efeitos.jogo.loja.play();
                this.loja = 0;
            }

            this.oneway2 = 1;
            this.oneway3 = 1;
        }

        else if (telaAtiva == telas.final) {
            if (this.oneway2 == 1) {
                this.oneway2 = 0;
                this.counter = 0;
                this.musicas.jogo.loop.pause();
                this.musicas.jogo.intro.pause();
                this.musicas.final.intro.play();
            }
        }

        if (this.enter == 1) {
            this.efeitos.enter.play();
            this.enter = 0;
        }

        if (this.select == 1) {
            this.efeitos.arrow.play();
            this.select = 0;
        }
    },
}

function reset() {
    //Resetando o Player 1
    {
        player1.state = 0;
        player1.spriteX = 0;
        player1.spriteY = 0;
        player1.largura =133;
        player1.altura = 120;
        player1.largura1 = 133;
        player1.altura1 = 120;
        player1.counter = 0;
        player1.vezes = 0;
        player1.zeraX = 0;
        player1.vida = 50;
        player1.shield = 0;
        player1.ataque1 = 10;
        player1.ataque2 = 15;
        player1.recovery = 4;
        player1.coins = 0;
        player1.protect = 0;
        player1.revive = 0;
        player1.reforco = 0;
    }

    //Resetando o Player 2
    {
        player2.state = 0;
        player2.spriteX = 0;
        player2.spriteY = 0;
        player2.largura =133;
        player2.altura = 120;
        player2.largura1 = 133;
        player2.altura1 = 120;
        player2.counter = 0;
        player2.vezes = 0;
        player2.zeraX = 0;
        player2.vida = 50;
        player2.shield = 0;
        player2.ataque1 = 10;
        player2.ataque2 = 15;
        player2.recovery = 4;
        player2.coins = 0;
        player2.protect = 0;
        player2.revive = 0;
        player2.reforco = 0;
    }

    //Resetando o objeto "morreu"
    {
        morreu.morre = 0;
    }

    //Resetando o objeto "sonoplastia"
    {
        sonoplastia.musicas.inicio.intro.pause();
        sonoplastia.musicas.inicio.intro.currentTime = 0;
        sonoplastia.musicas.inicio.loop.pause();
        sonoplastia.musicas.inicio.loop.currentTime = 0;
        sonoplastia.musicas.jogo.intro.pause();
        sonoplastia.musicas.jogo.intro.currentTime = 0;
        sonoplastia.musicas.jogo.loop.pause();
        sonoplastia.musicas.jogo.loop.currentTime = 0;
        sonoplastia.musicas.final.intro.pause();
        sonoplastia.musicas.final.intro.currentTime = 0;

        sonoplastia.volume = 1;
        sonoplastia.counter = 0;
        sonoplastia.oneway = 1;
        sonoplastia.oneway1 = 1;
        sonoplastia.oneway2 = 1;
        sonoplastia.oneway3 = 1;
        sonoplastia.one = 1;
        sonoplastia.one1 = 1;
        sonoplastia.one2 = 1;
        sonoplastia.one3 = 1;
        sonoplastia.loja = 0;
    }

    //Resetando o Wizard
    {
        wizard.state = 2;
        wizard.zeraX = 0;
        wizard.counter = 0;
        wizard.frames = 0;
        wizard.chegou = 0;
        wizard.onde = 0;
        wizard.retirar = 0;
        wizard.x = (canvas.width + 80);
        wizard.y = -80;
    }

    //Resetando a loja
    {
        loja.string_title = "";
        loja.string_body = "";
        loja.string_body_line2 = "";
        loja.string_cost = "";
        loja.off1 = 0;
        loja.off2 = 0;
        loja.off3 = 0;
        loja.off4 = 0;
        loja.off5 = 0;
        loja.off1_2 = 0;
        loja.off2_2 = 0;
        loja.off3_2 = 0;
        loja.off4_2 = 0;
        loja.off5_2 = 0;
        loja.lock = 0;
    }

    //Resetando o objeto "text"
    {
        text.string = "Digite o apelido do Player 1:";
        text.nome1 = "";
        text.nome2 = "";
        text.player = 1;
        text.confirmacao = 0;
        text.direcao = 0;
    }

    //Resetando o objeto "text_vez"
    {
        text_vez.string = "";
        text_vez.counter = 0;
        text_vez.vez = 1;
        text_vez.letra = 0;
    }

    //Resetando o objeto "mostra_dano"
    {
        mostra_dano.x = 0;
        mostra_dano.string = "";
        mostra_dano.quem = 0;
        mostra_dano.qual = 0;
        mostra_dano.counter = 0;
        mostra_dano.alpha = 1;
    }

    //Resetando variáveis
    {
        tuto = 1;
        lojaON = 0;
        lojaTurn = 1;
        drawWizard = 0;
        botoes.btn_on = 0;
    }

    mudaTela(telas.inicio);
}

const telas = {
    previa: {
        desenha() {
            previa.desenha();
        },

        atualiza() {

        }
    },
    inicio: {
        desenha() {
            background_logo.desenha();
            titulo.desenha();
        },
        atualiza() {
        },
    },
    lobby: {
        desenha() {
            background_logo.desenha();

            if (text.confirmacao == 0) {
                text.desenha();
            }

            else {
                black_screen.desenha();
                text.desenhaConfirmacao();
            }
        },
        atualiza() {

        },
    },
    tutorial: {
        desenha() {
            black_screen.desenha();

            if (tutorial.part2 == 1) {
                botoes.desenha();
            }

            if (tutorial.part6 == 1) {
                btn_loja.desenha();
            }
            
            tutorial.desenha();
        },

        atualiza() {

        },
    },
    jogo: {
        desenha() {
            Background_jogo.desenha();
            plataform.desenha();
            player1.desenha();
            player2.desenha();
            shield.desenha();
            life_bar.desenha();
            life_bar2.desenha();

            if (dano == 1) {
                mostra_dano.desenha();
            }

            if (coin == 1) {
                ganha_moeda.desenha();
            }

            if (letter == 1) {
                letras.desenha();
            }

            if (textoVez == 1) {
                input_allow = 0;
                black_screen.desenha();
                text_vez.desenha();
            }

            if (botoes.btn_on == 1) {
                botoes.desenha();
                turnoDe.desenha();

                if (lojaTurn == 1 && botoes.attack == 0) {
                    btn_loja.desenha();
                }
            }
            
            if (drawWizard == 1) {
                wizard.desenha();
            }

            if (tiro == 1) {
                mago_tiro.desenha();
            }

            if (lojaON == 1) {
                loja.desenha();
            }
        },

        atualiza() {
            player1.atualiza();
            player2.atualiza();
            morreu.atualiza();

            if (textoVez == 1) {
                text_vez.atualiza();
            }

            else {
                crialetra();
            }

            if (drawWizard == 1) {
                wizard.atualiza();
            }

        },
    },
    final: {
        desenha() {
            black_screen2.desenha();
            player1.desenha();
            player2.desenha();
            who_win.desenha();
        },

        atualiza() {
            end_game.atualiza();
        },
    },
}

function crialetra() {
    if (player1.state == 0 && player2.state == 0) {
        if (text_vez.letra == 1) {
            if (Math.floor(Math.random() * 2) == 1) {
                letter = 1;
                letras.letter = Math.floor(Math.random() * 5);
                letras.number = Math.floor(Math.random() * 4);
                text_vez.letra = 0;
            }

            else {
                text_vez.letra = 0;
            }
        }
    }
}

function mudaTela(tela) {
    contexto.clearRect(0, 0, canvas.width, canvas.height);
    sonoplastia.oneway = 1;
    sonoplastia.oneway1 = 1;
    telaAtiva = tela;
}

function transitionForGame() {
    input_allow = 0;
    if (transOn == 1) {
        alpha += 0.05;
        contexto.fillStyle = "rgba(0, 0, 0, 0.05)";
        contexto.fillRect(0, 0, canvas.width, canvas.height);
        
        if (telaAtiva == telas.lobby || telaAtiva == telas.tutorial) {
            if (sonoplastia.volume >= 0.018) {
                sonoplastia.volume -= 0.017;
            }

            else {
                sonoplastia.volume = 0;
                sonoplastia.musicas.inicio.intro.pause();
                sonoplastia.musicas.inicio.loop.pause();
            }
        }

        if (alpha >= 3) {
            transOn = 0;
            alpha = 0;
            textoVez = 1;
            input_allow = 1;

            if (telaAtiva == telas.previa) {
                mudaTela(telas.inicio);
            }

            else {
                if (tuto == 1) {
                    mudaTela(telas.jogo);
                }
                
                else {
                    mudaTela(telas.tutorial);
                }
            } 
        };
    }
}

if (input_allow == 1) {
    window.onkeydown = function(event) {
        switch (event.key) {
            case "Enter": {
                if (telaAtiva == telas.inicio) {
                    mudaTela(telas.lobby);
                    sonoplastia.enter = 1;
                }

                else if (telaAtiva == telas.lobby) {
                    if (text.player == 1) {
                        if (text.nome1 != "") {
                            text.confirmacao = 1;
                            sonoplastia.enter = 1;
                        }

                        else {
                            alert("ERROR\nDigite um apelido valido para o player 1!");
                        }

                        if (text.direcao == 1) {
                            text.confirmacao = 0;
                            text.player = 2;
                            text.direcao = 0;
                            text.string = "Digite o apelido do Player 2:";
                        }

                        else if (text.direcao == 2) {
                            text.confirmacao = 0;
                            text.direcao = 0;
                            text.nome1 = "";
                            sonoplastia.efeitos.lobby.selected.currentTime = 0;
                        }
                    }
                    
                    else if (text.player == 2) {
                        if (text.nome2 == "") {
                            alert("ERROR\nDigite um apelido valido para o player 2!");
                        }

                        else if (text.nome2 == text.nome1) {
                            alert("ERROR\nOs apelidos dos jogadores devem ser diferentes!");
                        }

                        else {
                            text.confirmacao = 1;
                            sonoplastia.enter = 1;
                        }

                        if (text.direcao == 1) {
                            text.string = "Digite o apelido do Player 1:"
                            text.confirmacao = 0;
                            text.player = 1;
                            text.direcao = 0;
                            transOn = 1;
                        }

                        else if (text.direcao == 2) {
                            text.confirmacao = 0;
                            text.direcao = 0;
                            text.nome2 = "";
                        }
                    }
                }

                else if (telaAtiva == telas.jogo) {
                    if (botoes.attack == 0) {
                        if (botoes.selecao == 1) {
                            botoes.attack = 1;
                            botoes.selecao = 0;
                            sonoplastia.enter = 1;
                        }

                        else if (botoes.selecao == 2) {
                            if (Math.floor(Math.random() * 2) == 1) {
                                drawWizard = 1;
                                if (text_vez.vez == 1) {
                                    player1.state = 3;
                                }

                                else {
                                    player2.state = 3;
                                }
                            }

                            else {
                                if (text_vez.vez == 1) {
                                    player1.state = 3;
                                    text_vez.vez = 2;
                                }

                                else {
                                    player2.state = 3;
                                    text_vez.vez = 1;
                                }
                            }
                            
                            botoes.selecao = 0;
                            botoes.btn_on = 0;
                            sonoplastia.enter = 1;
                        }
                    }
                    
                    else {
                        if (botoes.selecao == 1) {
                            if (Math.floor(Math.random() * 2) == 1) {
                                drawWizard = 1;
                                if (text_vez.vez == 1) {
                                    player1.state = 1;
                                }

                                else {
                                    player2.state = 1;
                                }
                            }

                            else {
                                if (text_vez.vez == 1) {
                                    player1.state = 1;
                                    text_vez.vez = 2;
                                }

                                else {
                                    player2.state = 1;
                                    text_vez.vez = 1;
                                }
                            }

                            sonoplastia.enter = 1;
                        }
                        
                        else {
                            if (Math.floor(Math.random() * 2) == 1) {
                                if (text_vez.vez == 1) {
                                    player1.state = 2;
                                }
                                
                                else {
                                    player2.state = 2;
                                }

                                drawWizard = 1;
                            }

                            else {
                                if (text_vez.vez == 1) {
                                    player1.state = 2;
                                    text_vez.vez = 2;
                                }
                                
                                else {
                                    player2.state = 2;
                                    text_vez.vez = 1;
                                }
                            }
                            
                            sonoplastia.enter = 1;
                        }

                        botoes.selecao = 0;
                        botoes.attack = 0;
                        botoes.btn_on = 0;
                    }

                    if (loja.selecao != 0) {
                        loja.acao();
                        lojaON = 0;
                        sonoplastia.enter = 1;
                    }
                }

                else if (telaAtiva == telas.tutorial) {
                    if (tutorial.part2 == 1) {
                        if (tutorial.confirm == 1) {
                            tutorial.enter = 1;
                            sonoplastia.enter = 1;
                        }
                    }
                }

                else if (telaAtiva = telas.final) {
                    reset();
                }

                break;       
            };
            
            case "q":{
                if (text.confirmacao == 0) {
                   text.atualizaNome("q"); 
                }
                break;
            };

            case "Q":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("Q"); 
                }                
                break;
            };

            case "w":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("w"); 
                }
                break;
            };

            case "W":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("W"); 
                }
                break;
            };
            
            case "e":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("e"); 
                }
                break;
            };

            case "E":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("E"); 
                }
                break;
            };
            
            case "r":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("r"); 
                }
                break;
            };

            case "R":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("R"); 
                }
                break;
            };
            
            case "t":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("t"); 
                }
                break;
            };

            case "T":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("T"); 
                }
                break;
            };

            case "y":{
                if (telaAtiva == telas.lobby) {
                    if (text.confirmacao == 0) {
                        text.atualizaNome("y"); 
                    }
                }

                else if (letras.letter == 4 && telaAtiva == telas.jogo) {
                    if (letras.state == 3) {
                        letras.click = 1;
                    }
                }
                
                break;
            };

            case "Y":{
                if (telaAtiva == telas.lobby) {
                    if (text.confirmacao == 0) {
                        text.atualizaNome("Y"); 
                    }
                }

                else if (telaAtiva == telas.jogo) {
                    if (letras.letter == 4 && letras.state == 3) {
                        letras.click = 1;
                    }
                }

                break;
            };

            case "u":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("u"); 
                }
                break;
            };

            case "U":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("U"); 
                }
                break;
            };

            case "i":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("i"); 
                }
                break;
            };

            case "I":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("I"); 
                }
                break;
            };

            case "o":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("o"); 
                }
                break;
            };

            case "O":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("O"); 
                }
                break;
            };

            case "p":{
                if (telaAtiva == telas.lobby) {
                    if (text.confirmacao == 0) {
                        text.atualizaNome("p"); 
                    }
                }
                
                else if (telaAtiva == telas.jogo) {
                    if (letras.letter == 2 && letras.state == 3) {
                        letras.click = 1;
                    }
                }

                break;
            };

            case "P":{
                if (telaAtiva == telas.lobby) {
                    if (text.confirmacao == 0) {
                        text.atualizaNome("P"); 
                    }
                }
                
                else if (telaAtiva == telas.jogo) {
                    if (letras.letter == 2 && letras.state == 3) {
                        letras.click = 1;
                    }
                }

                break;
            };

            case "ArrowLeft":{
                if (telaAtiva == telas.jogo) {
                    if (lojaON == 1) {
                        if (loja.selecao > 1) {
                            loja.selecao --;
                        }
                        else {
                            loja.selecao = 1;
                        }
                        sonoplastia.efeitos.arrow.currentTime = 0;
                        sonoplastia.select = 1;
                    }

                    else {
                        if (botoes.btn_on == 1) {
                            botoes.selecao = 1;
                            sonoplastia.efeitos.arrow.currentTime = 0;
                            sonoplastia.select = 1;
                        }
                    }
                }

                else if (telaAtiva == telas.lobby) {
                    if (text.confirmacao == 1) {
                        text.direcao = 1;
                        sonoplastia.select = 1;
                        sonoplastia.efeitos.arrow.currentTime = 0;
                    }
                }

                else if (telaAtiva == telas.tutorial) {
                    if (tutorial.part2 == 1) {
                        botoes.selecao = 1;
                        tutorial.left = 1;
                        sonoplastia.select = 1;
                        sonoplastia.efeitos.arrow.currentTime = 0;
                    }
                }

                break;
            };

            case "a":{
                if (telaAtiva == telas.lobby) {
                    if (text.confirmacao == 0) {
                        text.atualizaNome("a");
                    }
                }
                
                else if (telaAtiva == telas.jogo) {
                    if (letras.letter == 0 && letras.state == 3) {
                        letras.click = 1;
                    }
                }

                break;
            };

            case "A":{
                if (telaAtiva == telas.lobby) {
                    if (text.confirmacao == 0) {
                        text.atualizaNome("A"); 
                    }
                }

                else if (telaAtiva == telas.jogo) {
                    if (letras.letter == 0 && letras.state == 3) {
                        letras.click = 1;
                    }
                }

                break;
            };

            case "s":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("s"); 
                }
                break;
            };
        
            case "S":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("S"); 
                }
                break;
            };

            case "ArrowRight":{
                if (telaAtiva == telas.jogo) {
                    if (lojaON == 1) {
                        if (loja.selecao == 0) {
                            loja.selecao = 5;
                        }

                        else if (loja.selecao < 5) {
                            loja.selecao ++;
                        }

                        sonoplastia.select = 1;
                        sonoplastia.efeitos.arrow.currentTime = 0;
                    }

                    else {
                        if (botoes.btn_on == 1) {
                            botoes.selecao = 2;
                            sonoplastia.select = 1;
                            sonoplastia.efeitos.arrow.currentTime = 0;
                        }
                    }
                }

                else if (telaAtiva == telas.lobby) {
                    if (text.confirmacao == 1) {
                        text.direcao = 2;
                        sonoplastia.select = 1;
                        sonoplastia.efeitos.arrow.currentTime = 0;
                    }
                }

                else if (telaAtiva == telas.tutorial) {
                    if (tutorial.part2 == 1) {
                        botoes.selecao = 2;
                        tutorial.right = 1;
                        sonoplastia.select = 1;
                        sonoplastia.efeitos.arrow.currentTime = 0;
                    }
                }

                break;
            };

            case "d":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("d");
                }

                break;
            };
            
            case "D":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("D"); 
                }
                break;
            };

            case "f":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("f"); 
                }
                break;
            };

            case "F":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("F"); 
                }
                break;
            };

            case "g":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("g"); 
                }
                break;
            };

            case "G":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("G"); 
                }
                break;
            };

            case "h":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("h");
                }
                break;
            };

            case "H":{
                if(text.confirmacao == 0) {
                    text.atualizaNome("H");
                }
                break;
            };

            case "j":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("j"); 
                }
                break;
            };

            case "J":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("J"); 
                }
                break;
            };

            case "k":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("k"); 
                }
                break;
            };

            case "K":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("K"); 
                }
                break;
            };

            case "l":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("l"); 
                }

                if (telaAtiva == telas.jogo) {
                    if (botoes.attack == 0 && player1.state == 0 && player2.state == 0 && textoVez == 0 && drawWizard == 0) {
                        if (lojaON == 1) {
                            lojaON = 0;
                            loja.selecao = 0;
                            sonoplastia.loja = 1;
                        }

                        else if (lojaTurn == 1) {
                            lojaON = 1;
                            botoes.selecao = 0;
                            loja.selecao = 0;
                            sonoplastia.loja = 1;
                        }
                    }
                }

                break;
            };

            case "L":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("L"); 
                }

                if (telaAtiva == telas.jogo) {
                    if (botoes.attack == 0 && player1.state == 0 && player2.state == 0 && textoVez == 0 && drawWizard == 0) {
                        if (lojaON == 1) {
                            lojaON = 0;
                            loja.selecao = 0;
                            sonoplastia.loja = 1;
                        }

                        else if (lojaTurn == 1) {
                            lojaON = 1;
                            botoes.selecao = 0;
                            loja.selecao = 0;
                            sonoplastia.loja = 1;
                        }
                    }
                }

                break;
            };

            case "ç":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("ç"); 
                }
                break;
            };

            case "Ç":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("Ç"); 
                }
                break;
            };

            case "z":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("z"); 
                }
                break;
            };

            case "Z":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("Z"); 
                }
                break;
            };

            case "x":{
                if (telaAtiva == telas.lobby) {
                    if (text.confirmacao == 0) {
                        text.atualizaNome("x"); 
                    }
                }
                

                else if (telaAtiva == telas.jogo) {
                    if (letras.letter == 3 && letras.state == 3) {
                        letras.click = 1;
                    }
                }

                break;
            };

            case "X":{
                if (telaAtiva == telas.lobby) {
                    if (text.confirmacao == 0) {
                        text.atualizaNome("X"); 
                    }
                }
                

                else if (telaAtiva == telas.jogo) {
                    if (letras.letter == 3 && letras.state == 3) {
                        letras.click = 1;
                    }
                }

                break;
            };

            case "c":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("c"); 
                }
                break;
            };

            case "C":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("C"); 
                }
                break;
            };

            case "v":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("v"); 
                }
                break;
            };

            case "V":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("V"); 
                }
                break;
            };

            case "b":{
                if (telaAtiva == telas.lobby) {
                    if (text.confirmacao == 0) {
                        text.atualizaNome("b"); 
                    }
                }

                else if (telaAtiva == telas.jogo) {
                    if (letras.letter == 1 && letras.state == 3) {
                        letras.click = 1;
                    }
                }

                break;
            };

            case "B":{
                if (telaAtiva == telas.lobby) {
                    if (text.confirmacao == 0) {
                        text.atualizaNome("B"); 
                    }
                }

                else if (telaAtiva == telas.jogo) {
                    if (letras.letter == 1 && letras.state == 3) {
                        letras.click = 1;
                    }
                }

                break;
            };

            case "n":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("n"); 
                }
                break;
            };

            case "N":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("N"); 
                }
                break;
            };

            case "m":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("m"); 
                }
                break;
            };

            case "M":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("M"); 
                }
                break;
            };

            case " ":{
                if (text.confirmacao == 0) {
                    text.atualizaNome(" ");
                }
                break;
            }

            case "1":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("1");
                }

                break;
            }

            case "2":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("2");
                }

                break;
            }

            case "3":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("3");
                }

                break;
            }

            case "4":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("4");
                }

                break;
            }

            case "5":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("5");
                }

                break;
            }

            case "6":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("6");
                }

                break;
            }

            case "7":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("7");
                }

                break;
            }

            case "8":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("8");
                }

                break;
            }

            case "9":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("9");
                }

                break;
            }

            case "0":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("0");
                }

                break;
            }

            case "@":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("@");
                }

                break;
            }

            case "#":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("#");
                }

                break;
            }

            case "$":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("$");
                }

                break;
            }

            case "(":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("(");
                }

                break;
            }

            case ")":{
                if (text.confirmacao == 0) {
                    text.atualizaNome(")");
                }

                break;
            }

            case "+":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("+");
                }

                break;
            }

            case "=":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("=");
                }

                break;
            }

            case "\\":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("\\");
                }

                break;
            }

            case "!":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("!");
                }

                break;
            }

            case "-":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("-");
                }

                break;
            }

            case "_":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("_");
                }

                break;
            }

            case "%":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("%");
                }

                break;
            }

            case "&":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("&");
                }

                break;
            }

            case "*":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("*");
                }

                break;
            }

            case "?":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("?");
                }

                break;
            }

            case "/":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("/");
                }

                break;
            }

            case ":":{
                if (text.confirmacao == 0) {
                    text.atualizaNome(":");
                }

                break;
            }

            case ";":{
                if (text.confirmacao == 0) {
                    text.atualizaNome(";");
                }

                break;
            }

            case ".":{
                if (text.confirmacao == 0) {
                    text.atualizaNome(".");
                }

                break;
            }

            case ",":{
                if (text.confirmacao == 0) {
                    text.atualizaNome(",");
                }

                break;
            }

            case "<":{
                if (text.confirmacao == 0) {
                    text.atualizaNome("<");
                }

                break;
            }

            case ">":{
                if (text.confirmacao == 0) {
                    text.atualizaNome(">");
                }

                break;
            }

            case "Backspace": {
                if (text.confirmacao == 0) {
                    text.atualizaNome("back");
                }
                break;
            }
        }
    }
}

window.onclick = function() {
    if (telaAtiva == telas.previa) {
        transOn = 1;
    }
}

function loop() {
    if (transOn == 0) {
        contexto.clearRect(0, 0, canvas.width, canvas.height);
        telaAtiva.desenha();
        telaAtiva.atualiza();
    }

    else {
        transitionForGame();
    }

    sonoplastia.reproduz();
    requestAnimationFrame(loop);
}

mudaTela(telas.previa);
loop();