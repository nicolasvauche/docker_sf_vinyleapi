<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    #[Route('/{reactRouting}', name: 'app_home', requirements: ["reactRouting" => "^(?!api).+"], defaults: ["reactRouting" => null])]
    public function index(): Response
    {
        return $this->render('default/index.html.twig');
    }

    #[Route('/api', name: 'app_api_index', methods: ['GET'])]
    public function api(): Response
    {
        return $this->json(['title' => 'Bienvenue dans votre API vinylotheque ;)'], 200);
    }
}
