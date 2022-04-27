<?php

namespace App\Controller;

use App\Repository\AlbumRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/album', name: 'app_album_')]
class AlbumController extends AbstractController
{
    #[Route('/', name: 'index', methods: ['GET'])]
    public function index(AlbumRepository $albumRepository): Response
    {
        return $this->json($albumRepository->findAll(), 200, [], ['groups' => 'album:read']);
    }
}
