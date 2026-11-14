<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $scores = $_POST["scores"];
    file_put_contents("highscores.json", $scores);
}

echo file_get_contents("highscores.json");

?>