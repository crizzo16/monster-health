let virtu = {
    monster:0,
    monster1Name: "Giant Spider #1",
    monster1HP: 26,
    monster1History: [],
    monster2Name: "Giant Spider #2",
    monster2HP: 24,
    monster2History: [],
    hitPoints:"",
    type: "generic",
    polarity: "damage",
    present:false,
    selectNum: function() {
        const sel = $(this).attr("val");
        virtu.hitPoints += sel;
        $(".dmg-number").text(virtu.hitPoints);
    },
    clearNum: function () {
        virtu.hitPoints="";
        $(".dmg-number").text(virtu.hitPoints);
    },
    selectDamage: function() {
        const sel = $(".dmg-type-highlight").attr("sel-id");
        const id = $(this).attr("sel-id");
        $(".dmg-type-highlight").removeClass("dmg-type-highlight");
        if (sel != id) {
            $(this).addClass("dmg-type-highlight");
        }
        virtu.type = $(this).text();
    },
    selectMonster: function() {
        const sel = $(".monster-highlight").attr("sel-id");
        const id = $(this).attr("sel-id");
        $(".monster-highlight").removeClass("monster-highlight");
        if (sel != id) {
            $(this).addClass("monster-highlight");
        }
        virtu.monster = parseInt(id);
    },
    resetDmgType: function() {
        $(".dmg-type-highlight").removeClass("dmg-type-highlight");
        $("#generic").addClass("dmg-type-highlight");
    },
    clearMonster: function() {
        virtu.monster = 0;
        console.log("all done now");
        $(".monster-highlight").removeClass("monster-highlight");
    },
    checkHealth: function() {
        const numMonsters = 2;
        for (let i=0; i<numMonsters; i++) {
            const hp = eval("virtu.monster" + (i+1) + "HP");
            const grab = "#" + (i+1);
            console.log("*******************");
            console.log(grab);
            console.log(hp);
            if (hp<1) {
                $(grab).addClass("dead-monster");
            } else {
                console.log("here");
                $(grab).removeClass("dead-monster");
            }
        }
    },
    submitHP: function() {
        console.log(virtu.monster);
        if (virtu.hitPoints > 0 && virtu.monster > 0) {
            virtu.polarity = $(this).attr("pol");
            let enemyHP = eval("virtu.monster" + virtu.monster + "HP");
            let badDude = eval("virtu.monster" + virtu.monster + "HP");
            if (virtu.polarity === "damage") {
                console.log("damage");
                enemyHP -= virtu.hitPoints;
                eval("virtu.monster" + virtu.monster + "HP = " + enemyHP);
                badDude = enemyHP;
                virtu.clearNum();
                virtu.resetDmgType();
                virtu.clearMonster();
                $("#mon1-hp").text(badDude);
                virtu.checkHealth();
            } else {
                console.log("healing");
                enemyHP = parseInt(virtu.hitPoints) + enemyHP;
                eval("virtu.monster" + virtu.monster + "HP = " + enemyHP);
                badDude = enemyHP;
                virtu.clearNum();
                virtu.resetDmgType();
                virtu.clearMonster();
                $("#mon1-hp").text(badDude);
                virtu.checkHealth();
            }
        } else {
            console.log("not enough info");
        }
    },
    testSwitch: function () {
        const num = virtu.monster;
    }
  };

  $(document).ready(function () {
    $("#mon1-hp").text(virtu.monster1HP);
    $("#mon2-hp").text(virtu.monster2HP);
    $("#mon1-name").text(virtu.monster1Name);
    $("#mon2-name").text(virtu.monster2Name);

    $(document).on("click", ".key-num", virtu.selectNum);
    $(document).on("click", ".key-num-clear", virtu.clearNum);
    $(document).on("click", ".dmg-type", virtu.selectDamage);
    $(document).on("click", ".submit-hp", virtu.submitHP);
    $(document).on("click", ".monster", virtu.selectMonster);
    $(document).on("click", ".test", virtu.testSwitch);
  });
