<?php

namespace App\Controller;

use App\Entity\Artist;
use App\Repository\ArtistRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api/artist', name: 'app_artist_')]
class ArtistController extends AbstractController
{
    #[Route('', name: 'index', methods: ['GET'])]
    public function index(ArtistRepository $artistRepository): Response
    {
        return $this->json($artistRepository->findAll(), 200, [], ['groups' => 'artist:read']);
    }

    #[Route('', name: 'add', methods: ['POST'])]
    public function add(Request $request, SerializerInterface $serializer, ValidatorInterface $validator, ArtistRepository $artistRepository): Response
    {
        try {
            $artist = $serializer->deserialize($request->getContent(), Artist::class, 'json');

            $errors = $validator->validate($artist);
            if (count($errors) > 0) {
                return $this->json($errors, 400);
            }

            $artistRepository->add($artist);

            return $this->json($artist, 200);
        } catch (NotEncodableValueException $e) {
            return $this->json(['status' => 400, 'message' => $e->getMessage()], 400);
        }

    }
}
